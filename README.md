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
npx truffle console --network development
npx truffle exec --network development scripts/index.js
```

Contract address: 0x97a644C6dE4302F91E85406e0c80107b8d72f909

```shell
truffle run verify BEP20Token@{contract-address} --network testnet
```