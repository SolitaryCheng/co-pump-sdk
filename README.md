# Co-Pump SDK

[![npm version](https://img.shields.io/npm/v/@solitary-cheng/co-pump-sdk.svg)](https://www.npmjs.com/package/@solitary-cheng/co-pump-sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Community-enhanced Pumpfun SDK for Solana.

> 该社区版本对官方库进行了优化，修复了已知问题，并提供了完整的使用文档。

## Features

- 完整支持 Pump Buy 操作
- 集成 Pump Swap 功能
- 优化的性能和可靠性
- 详细的使用示例和文档

## Installation

```bash
npm install @solitary-cheng/co-pump-sdk
```

## Usage

### Pump Buy

购买代币时，您可以使用以下示例代码：

```typescript
import * as web3 from '@solana/web3.js';
import { 
  PumpSdk, 
  getBuyTokenAmountFromSolAmount,
  getBuySolAmountFromTokenAmount,
  getSellSolAmountFromTokenAmount
} from "@solitary-cheng/co-pump-sdk";

// 初始化 SDK
const pumpSdk = new PumpSdk(RPC_CONNECTION);

// 获取全局参数
const global = await pumpSdk.getGlobal();

// 设置代币铸造地址
const mint = new web3.PublicKey(MINT_ADDRESS);

// 获取绑定曲线信息
const bondingCurve = await pumpSdk.cachedBondingCurve(mint);

// 设置订单金额（以 SOL 计算）
const orderAmount = new BN(1 * web3.LAMPORTS_PER_SOL);

// 计算可获得的代币数量
const orderAmountToken = getBuyTokenAmountFromSolAmount(
  global, 
  bondingCurve, 
  orderAmount, 
  false
);

// 创建购买指令
const ixs = await pumpSdk.buyInstructions(
  mint, 
  keypair.publicKey, 
  orderAmountToken, 
  orderAmount, 
  maxSlippage,
);
```

出售代币时，可使用以下示例代码：

```typescript
import * as web3 from '@solana/web3.js';
import { 
  PumpSdk, 
  getBuyTokenAmountFromSolAmount,
  getBuySolAmountFromTokenAmount,
  getSellSolAmountFromTokenAmount
} from "@solitary-cheng/co-pump-sdk";

// 初始化 SDK
const pumpSdk = new PumpSdk(RPC_CONNECTION);

// 获取全局参数
const global = await pumpSdk.getGlobal();

// 设置代币铸造地址
const mint = new web3.PublicKey(MINT_ADDRESS);

// 获取绑定曲线信息
const bondingCurve = await pumpSdk.cachedBondingCurve(mint);

// 设置代币数量
const orderAmountToken = new BN(100_000 * 1e6);

// 计算可获得的代币数量
const orderAmount = getSellSolAmountFromTokenAmount(
  global,
  bondingCurve, 
  orderAmountToken
);

// 创建购买指令
const ixs = await pumpSdk.sellInstructions(
  global, null, mint, 
  keypair.publicKey, 
  orderAmountToken, 
  orderAmount, 
  maxSlippage,
);
```


### Pump Swap

进行代币交换时，可参考以下代码：

```typescript
import * as web3 from '@solana/web3.js';
import { poolPda, PumpAmmSdk, pumpPoolAuthorityPda } from "@pump-fun/pump-swap-sdk";

// 初始化 Swap SDK
const pumpAmmSdk = new PumpAmmSdk(RPC_CONNECTION);

// 设置代币铸造地址
const mint = new web3.PublicKey(MINT_ADDRESS);
const quoteMint = new web3.PublicKey(WRAPPED_SOL_ADDRESS);

// 获取池权限和池 ID
const poolAuthority = pumpPoolAuthorityPda(mint);
const id = poolPda(0, poolAuthority[0], mint, quoteMint);
const pool = id[0];

// 设置订单金额（以 SOL 计算）
const orderAmount = new BN(1 * web3.LAMPORTS_PER_SOL);

// 计算可交换的代币数量
const orderAmountToken = await pumpAmmSdk.swapAutocompleteBaseFromQuote(
  pool,
  orderAmount,
  maxSlippage,
  "quoteToBase"
);

// 创建交换指令
const ixs = await pumpAmmSdk.swapBaseInstructions(
  pool,
  orderAmountToken,
  maxSlippage,
  "quoteToBase",
  keypair.publicKey,
);
```

## API 参考

请参考源代码中的类型定义和函数注释获取详细的 API 信息。

## 贡献指南

欢迎提交问题和改进建议！请通过 GitHub issues 或 pull requests 参与项目。

## 许可证

MIT

---

Powered by [Rustradex.com](https://rustradex.com)