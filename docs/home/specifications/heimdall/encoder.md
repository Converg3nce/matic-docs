---
id: encoder
title: Encoder (Pulp)
---
Source: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

All transactions uses `pulp` (RLP based) encoding instead of default amino encoding to make it verifiable on Ethereum smart contract.

Pulp uses prefix based simple encoding mechanism to solve interface decoding. Check `GetPulpHash` method.