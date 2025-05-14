import { BN } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { BondingCurve, Global } from "./state";

function getFee(
  global: Global,
  bondingCurve: BondingCurve,
  amount: BN,
  newCoin: boolean,
): BN {
  return computeFee(amount, global.feeBasisPoints).add(
    newCoin || !PublicKey.default.equals(bondingCurve.creator)
      ? computeFee(amount, global.creatorFeeBasisPoints)
      : new BN(0),
  );
}

function computeFee(amount: BN, feeBasisPoints: BN): BN {
  return ceilDiv(amount.mul(feeBasisPoints), new BN(10_000));
}

function ceilDiv(a: BN, b: BN): BN {
  return a.add(b.subn(1)).div(b);
}

export function getBuyTokenAmountFromSolAmount(
  global: Global,
  bondingCurve: BondingCurve,
  amount: BN,
  newCoin: boolean,
): BN {
  if (amount.eq(new BN(0))) {
    return new BN(0);
  }

  // migrated bonding curve
  if (bondingCurve.virtualTokenReserves.eq(new BN(0))) {
    return new BN(0);
  }

  const totalFeeBasisPoints = global.feeBasisPoints.add(
    newCoin || !PublicKey.default.equals(bondingCurve.creator)
      ? global.creatorFeeBasisPoints
      : new BN(0),
  );

  const inputAmount = amount.muln(10_000).div(totalFeeBasisPoints.addn(10_000));

  const tokensReceived = inputAmount
    .mul(bondingCurve.virtualTokenReserves)
    .div(bondingCurve.virtualSolReserves.add(inputAmount));

  return BN.min(tokensReceived, bondingCurve.realTokenReserves);
}

export function getBuySolAmountFromTokenAmount(
  global: Global,
  bondingCurve: BondingCurve,
  amount: BN,
  newCoin: boolean,
): BN {
  if (amount.eq(new BN(0))) {
    return new BN(0);
  }

  // migrated bonding curve
  if (bondingCurve.virtualTokenReserves.eq(new BN(0))) {
    return new BN(0);
  }

  const minAmount = BN.min(amount, bondingCurve.realTokenReserves);

  const solCost = minAmount
    .mul(bondingCurve.virtualSolReserves)
    .div(bondingCurve.virtualTokenReserves.sub(minAmount))
    .add(new BN(1));

  return solCost.add(getFee(global, bondingCurve, solCost, newCoin));
}

export function getSellSolAmountFromTokenAmount(
  global: Global,
  bondingCurve: BondingCurve,
  amount: BN,
): BN {
  if (amount.eq(new BN(0))) {
    return new BN(0);
  }

  // migrated bonding curve
  if (bondingCurve.virtualTokenReserves.eq(new BN(0))) {
    return new BN(0);
  }

  const solCost = amount
    .mul(bondingCurve.virtualSolReserves)
    .div(bondingCurve.virtualTokenReserves.add(amount));

  return solCost.sub(getFee(global, bondingCurve, solCost, false));
}
