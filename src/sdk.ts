import BN from "bn.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { PumpAmmSdk } from "@pump-fun/pump-swap-sdk";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import {
  AccountInfo,
  Connection,
  PublicKey,
  PublicKeyInitData,
  TransactionInstruction,
} from "@solana/web3.js";
import pumpIdl from "./idl/pump.json";
import { Pump } from "./idl/pump";

import {
  bondingCurvePda,
  canonicalPumpPoolPda,
  creatorVaultPda,
  globalPda,
  pumpPoolAuthorityPda,
} from "./pda";
import { BondingCurve, Global } from "./state";
import { memoize } from "./decorator";

export function getPumpProgram(
  connection: Connection,
  programId: PublicKey,
): Program<Pump> {
  const pumpIdlAddressOverride = { ...pumpIdl };

  pumpIdlAddressOverride.address = programId.toString();

  return new Program(
    pumpIdlAddressOverride as Pump,
    new AnchorProvider(connection, null as any, {}),
  );
}

export const PUMP_PROGRAM_ID = new PublicKey(
  "6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P",
);
export const PUMP_AMM_PROGRAM_ID = new PublicKey(
  "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA",
);

export const BONDING_CURVE_NEW_SIZE = 150;

export class PumpSdk {
  protected readonly connection: Connection;
  protected readonly pumpProgram: Program<Pump>;
  protected readonly pumpAmmSdk: PumpAmmSdk;

  constructor(
    connection: Connection,
    pumpProgramId: PublicKey = PUMP_PROGRAM_ID,
    pumpAmmProgramId: PublicKey = PUMP_AMM_PROGRAM_ID,
  ) {
    this.connection = connection;
    this.pumpProgram = getPumpProgram(connection, pumpProgramId);
    this.pumpAmmSdk = new PumpAmmSdk(connection, pumpAmmProgramId.toBase58());
  }

  programId(): PublicKey {
    return this.pumpProgram.programId;
  }

  globalPda() {
    return globalPda(this.pumpProgram.programId);
  }

  bondingCurvePda(mint: PublicKeyInitData): PublicKey {
    return bondingCurvePda(this.pumpProgram.programId, mint);
  }

  creatorVaultPda(creator: PublicKey) {
    return creatorVaultPda(this.pumpProgram.programId, creator);
  }

  pumpPoolAuthorityPda(mint: PublicKey): [PublicKey, number] {
    return pumpPoolAuthorityPda(mint, this.pumpProgram.programId);
  }

  canonicalPumpPoolPda(mint: PublicKey): [PublicKey, number] {
    return canonicalPumpPoolPda(
      this.pumpProgram.programId,
      this.pumpAmmSdk.programId(),
      mint,
    );
  }

  decodeGlobal(accountInfo: AccountInfo<Buffer>): Global {
    return this.pumpProgram.coder.accounts.decode<Global>(
      "global",
      accountInfo.data,
    );
  }

  decodeBondingCurve(accountInfo: AccountInfo<Buffer>): BondingCurve {
    return this.pumpProgram.coder.accounts.decode<BondingCurve>(
      "bondingCurve",
      accountInfo.data,
    );
  }

  async fetchGlobal(): Promise<Global> {
    return await this.pumpProgram.account.global.fetch(this.globalPda());
  }

  async fetchBondingCurve(mint: PublicKeyInitData): Promise<BondingCurve> {
    return await this.pumpProgram.account.bondingCurve.fetch(
      this.bondingCurvePda(mint),
    );
  }

  async createInstruction(
    mint: PublicKey,
    name: string,
    symbol: string,
    uri: string,
    creator: PublicKey,
    user: PublicKey,
  ): Promise<TransactionInstruction> {
    return await this.pumpProgram.methods
      .create(name, symbol, uri, creator)
      .accountsPartial({
        mint,
        user,
      })
      .instruction();
  }

  @memoize(0)
  async getGlobal() {
    return await this.fetchGlobal();
  }

  @memoize(0, (mint) => mint.toBase58())
  async cachedBondingCurve(mint: PublicKey) {
    return await this.fetchBondingCurve(mint);
  }

  async getBondingCurveAccountInfo(
    mint: PublicKeyInitData,
    isThrowErrorWhenNull = true,
  ) {
    try {
      const bondingCurvePda = this.bondingCurvePda(mint);
      return await this.connection.getAccountInfo(bondingCurvePda);
    } catch (error) {
      if (isThrowErrorWhenNull) throw error;
      return null;
    }
  }

  async buyInstructions2(
    mint: PublicKey,
    user: PublicKey,
    amount: BN,
    solAmount: BN,
    slippage: number,
    creator?: PublicKey,
    isAutoCreateAccount = true, //
  ) {
    const instructions = [];
    const global = await this.getGlobal();
    const associatedUser = getAssociatedTokenAddressSync(mint, user, true);
    const $creator = creator ?? (await this.cachedBondingCurve(mint)).creator;
    if (isAutoCreateAccount) {
      instructions.push(
        createAssociatedTokenAccountIdempotentInstruction(
          user,
          associatedUser,
          user,
          mint,
        ),
      );
    } else {
      const userTokenAccount = await getAccount(
        this.connection,
        associatedUser,
      ).catch((e) => null);

      // if user account doesn't exist add an instruction to create it
      if (!userTokenAccount) {
        instructions.push(
          createAssociatedTokenAccountInstruction(
            user,
            associatedUser,
            user,
            mint,
          ),
        );
      }
    }

    await this.pumpProgram.methods
      .buy(
        amount,
        solAmount.add(
          solAmount.mul(new BN(Math.floor(slippage * 10))).div(new BN(1e3)),
        ),
      )
      .accountsPartial({
        feeRecipient: getFeeRecipient(global),
        mint,
        associatedUser,
        user,
        creatorVault: this.creatorVaultPda($creator),
      })
      .instruction();
  }

  async sellInstructions(
    global: Global,
    bondingCurveAccountInfo: AccountInfo<Buffer> | null,
    mint: PublicKey,
    user: PublicKey,
    amount: BN,
    solAmount: BN,
    slippage: number,
  ): Promise<TransactionInstruction[]> {
    return this.withFixBondingCurve(
      mint,
      bondingCurveAccountInfo,
      user,
      async () => {
        return [
          await this.pumpProgram.methods
            .sell(
              amount,
              solAmount.sub(
                solAmount
                  .mul(new BN(Math.floor(slippage * 10)))
                  .div(new BN(1000)),
              ),
            )
            .accountsPartial({
              feeRecipient: getFeeRecipient(global),
              mint,
              associatedUser: getAssociatedTokenAddressSync(mint, user, true),
              user,
            })
            .instruction(),
        ];
      },
    );
  }

  async fixExistingBondingCurve(
    mint: PublicKey,
    bondingCurveAccountInfo: AccountInfo<Buffer> | null,
    user: PublicKey,
  ): Promise<TransactionInstruction[]> {
    return this.withFixBondingCurve(
      mint,
      bondingCurveAccountInfo,
      user,
      async () => [],
    );
  }

  private async withFixBondingCurve(
    mint: PublicKey,
    bondingCurveAccountInfo: AccountInfo<Buffer> | null,
    user: PublicKey,
    block: () => Promise<TransactionInstruction[]>,
  ): Promise<TransactionInstruction[]> {
    if (
      bondingCurveAccountInfo === null ||
      bondingCurveAccountInfo.data.length < BONDING_CURVE_NEW_SIZE
    ) {
      return [
        await this.extendAccount(this.bondingCurvePda(mint), user),
        ...(await block()),
      ];
    }

    return await block();
  }

  async extendAccount(
    account: PublicKey,
    user: PublicKey,
  ): Promise<TransactionInstruction> {
    return this.pumpProgram.methods
      .extendAccount()
      .accountsPartial({
        account,
        user,
      })
      .instruction();
  }

  async migrateInstruction(
    mint: PublicKey,
    user: PublicKey,
  ): Promise<TransactionInstruction> {
    return this.pumpProgram.methods
      .migrate()
      .accountsPartial({
        mint,
        user,
      })
      .instruction();
  }

  async collectCoinCreatorFeeInstructions(
    coinCreator: PublicKey,
  ): Promise<TransactionInstruction[]> {
    return [
      await this.pumpProgram.methods
        .collectCreatorFee()
        .accountsPartial({
          creator: coinCreator,
        })
        .instruction(),
      ...(await this.pumpAmmSdk.collectCoinCreatorFee(coinCreator)),
    ];
  }

  async getCreatorVaultBalance(creator: PublicKey): Promise<BN> {
    const creatorVault = this.creatorVaultPda(creator);
    const accountInfo = await this.connection.getAccountInfo(creatorVault);

    if (accountInfo === null) {
      return new BN(0);
    }

    const rentExemptionLamports =
      await this.connection.getMinimumBalanceForRentExemption(
        accountInfo.data.length,
      );

    if (accountInfo.lamports < rentExemptionLamports) {
      return new BN(0);
    }

    return new BN(accountInfo.lamports - rentExemptionLamports);
  }
}

function getFeeRecipient(global: Global): PublicKey {
  const feeRecipients = [global.feeRecipient, ...global.feeRecipients];
  return feeRecipients[Math.floor(Math.random() * feeRecipients.length)];
}
