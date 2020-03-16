/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  introduction: [
    "resources/new-to-matic",
    {
      type: "category",
      label: "Blockchain Basics",
      items: [
        "resources/blockchain-basics/blockchain",
        "resources/blockchain-basics/blockchain-types",
        "resources/blockchain-basics/consensus-mechanism",
        "resources/blockchain-basics/ethereum",
        "resources/blockchain-basics/matic",
        "resources/blockchain-basics/solidity",
        "resources/blockchain-basics/transactions",
        "resources/blockchain-basics/gas",
        "resources/blockchain-basics/accounts",
        "resources/sidechain"
      ]
    },
    {
      type: "category",
      label: "Validator",
      items: [
        "validator/staking",
        "validator/validator",
        "validator/proposers-producers-selection",
        "validator/state-sync",
        "validator/heimdall-chain",
        "validator/bor-chain",
        "validator/delegator",
        "validator/checkpoint-mechanism",
        "validator/liquid-delegation"
      ]
    },
    {
      type: "category",
      label: "Bor Specs",
      items: ["bor-spec/bor","bor-spec/setup-bor"]
    },
    "resources/architecture",
    "advanced/security-models",
    "resources/faq"
  ],
  development: [
    "getting-started",
    "helloworld",
    
    {
      type: "category",
      label: "Using Metamask",
      items: [
        "metamask",
        "metamask/conf-custom-tokens-metamask",
        "metamask/conf-testnet-metamask",
        "metamask/gas-fees",
        "metamask/multiple-accounts",
      ]
    },
    {
      type: "category",
      label: "Deploying on Matic",
      items: ["config-truffle"]

    },
    {
      type: "category",
      label: "Connect to Web3",
      items: [
        "integrations/key-management/getting-started",
        "integrations/key-management/metamask",
        "integrations/key-management/walletconnect",
        "integrations/key-management/portis"
      ]
    },
    {
      type: "category",
      label: "Ethereum ↔️ Matic",
      items: ["sdk/matic-js", "sdk/api-reference", "advanced/moving-assets"]
    },
    {
      type: "category",
      label: "Meta Transactions",
      items: [
        "integrations/metatransactions/metatransactions",
        "integrations/metatransactions/metatransactions-biconomy",
        "integrations/metatransactions/metatransactions-gsn"
      ]
    },
    "integrations/oracles",
    "integrations/fiat-on-ramp",
    {
      type: "category",
      label: "Realtime Updates",
      items: [
        "dagger/getting-started",
        "integrations/zapier/about",
        "integrations/zapier/getting-started"
      ]
    },
    {
      type: "category",
      label: "Decentralised Storage",
      items: ["integrations/decentralised-storage/moibit"]
    },

    "network-config",
    {
      type: "category",
      label: "Tutorials",
      items: ["tutorial-advanced/full-stack-dapp-with-pos"]
    },
    {
      type: "category",
      label: "Advanced",
      items: [
        
        "advanced/calling-plasma-contracts",
        "advanced/swap-assets",

        "advanced/deploy-your-own-matic-testnet",
        "advanced/custom-restrictions"
      ]
    }
  ],
  Integrations: ["integrations/getting-started"],
  Validators: [
    "staking/economics",
    "staking/technical-requirements",
    {
      type: "category",
      label: "Counter Stake: Stage 1",
      items: [
        "staking/counter-stake-stage-1/getting-started",
        "staking/counter-stake-stage-1/introduction",
        "staking/counter-stake-stage-1/linux-package-installation",
        "staking/counter-stake-stage-1/running-with-binaries",
        "staking/counter-stake-stage-1/running-with-docker",
        "staking/counter-stake-stage-1/stake-on-matic",
        "staking/counter-stake-stage-1/technical-faqs"
      ]
    },
    "staking/faqs"
  ]
};
