# Sample Truffle Suite Project

## For deploying local:

```shell
pnpm install
npx truffle compile
npx ganache
```

Open other terminal tab

```shell
npx truffle migrate --network development
npx truffle test
npx truffle console --network development
npx truffle exec --network development scripts/index.js
```

Deploy & upgrade testnet

```shell
npx truffle migrate --network testnet
npx truffle console --network testnet
```

Address: 0x97a644C6dE4302F91E85406e0c80107b8d72f909

Verify contract

```shell
truffle run verify ERC20Token@{contract-address} --network testnet
```