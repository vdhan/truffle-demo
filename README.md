# Sample Truffle Suite Project

## For deploying local:

```shell
pnpm install
npx truffle compile
npx truffle develop
```

Open other terminal tab

```shell
npx truffle migrate --network develop
npx truffle test --network develop
npx truffle console --network develop
npx truffle exec scripts/index.js --network develop
```

Deploy & upgrade testnet

```shell
npx truffle migrate --network testnet
npx truffle console --network testnet
```

Address: 0x3b0c224538e323616Ba25344E3eDF81c9B71f014

Verify contract

```shell
npx truffle run verify ERC20Token@{contract-address} --network testnet
```