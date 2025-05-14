import { PublicKey, PublicKeyInitData } from "@solana/web3.js";
import { NATIVE_MINT } from "@solana/spl-token";
import { poolPda } from "@pump-fun/pump-swap-sdk";

export function globalPda(programId: PublicKey): PublicKey {
  const [globalPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("global")],
    programId,
  );
  return globalPda;
}

export function bondingCurvePda(
  programId: PublicKey,
  mint: PublicKeyInitData,
): PublicKey {
  const [bondingCurvePda] = PublicKey.findProgramAddressSync(
    [Buffer.from("bonding-curve"), new PublicKey(mint).toBuffer()],
    programId,
  );
  return bondingCurvePda;
}

export function creatorVaultPda(programId: PublicKey, creator: PublicKey) {
  const [creatorVault] = PublicKey.findProgramAddressSync(
    [Buffer.from("creator-vault"), creator.toBuffer()],
    programId,
  );
  return creatorVault;
}

export function pumpPoolAuthorityPda(
  mint: PublicKey,
  pumpProgramId: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("pool-authority"), mint.toBuffer()],
    pumpProgramId,
  );
}

export const CANONICAL_POOL_INDEX = 0;

export function canonicalPumpPoolPda(
  pumpProgramId: PublicKey,
  pumpAmmProgramId: PublicKey,
  mint: PublicKey,
): [PublicKey, number] {
  const [pumpPoolAuthority] = pumpPoolAuthorityPda(mint, pumpProgramId);

  return poolPda(
    CANONICAL_POOL_INDEX,
    pumpPoolAuthority,
    mint,
    NATIVE_MINT,
    pumpAmmProgramId,
  );
}
