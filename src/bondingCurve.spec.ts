import { PublicKey } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import {
  getBuySolAmountFromTokenAmount,
  getBuyTokenAmountFromSolAmount,
} from "./bondingCurve";

describe("tests", () => {
  let initialVirtualTokenReserves = new BN(1_073_000_000_000_000);
  let initialVirtualSolReserves = new BN(30_000_000_000);
  let initialRealTokenReserves = new BN(793_100_000_000_000);
  let initialRealSolReserves = new BN(0);
  let tokenTotalSupply = new BN(1_000_000_000_000_000);

  const global = {
    initialized: true,
    authority: PublicKey.default,
    feeRecipient: PublicKey.default,
    initialVirtualTokenReserves,
    initialVirtualSolReserves,
    initialRealTokenReserves,
    tokenTotalSupply,
    feeBasisPoints: new BN(95),
    withdrawAuthority: PublicKey.default,
    enableMigrate: true,
    poolMigrationFee: new BN(0),
    creatorFeeBasisPoints: new BN(5),
    feeRecipients: [],
  };

  const bondingCurve = {
    creator: PublicKey.default,
    virtualTokenReserves: initialVirtualTokenReserves,
    virtualSolReserves: initialVirtualSolReserves,
    realTokenReserves: initialRealTokenReserves,
    realSolReserves: initialRealSolReserves,
    tokenTotalSupply: tokenTotalSupply,
    complete: true,
  };

  let solAmount = new BN(10_000_000);
  let tokenAmount = new BN(354_008_574_488);

  it("getBuyTokenAmountFromSolAmount", () => {
    const result = getBuyTokenAmountFromSolAmount(
      global,
      bondingCurve,
      solAmount,
      true,
    );

    expect(result.toString()).toBe(tokenAmount.toString());
  });

  it("getBuySolAmountFromTokenAmount", () => {
    const result = getBuySolAmountFromTokenAmount(
      global,
      bondingCurve,
      tokenAmount,
      true,
    );

    expect(result.toString()).toBe(solAmount.addn(1).toString());
  });
});
