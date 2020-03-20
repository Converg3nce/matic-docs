/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  introduction: [
    "home/new-to-matic",
    {
      type: "category",
      label: "Blockchain Basics",
      items: [
        "home/blockchain-basics/blockchain",
        "home/blockchain-basics/blockchain-types",
        "home/blockchain-basics/consensus-mechanism",
        "home/blockchain-basics/ethereum",
        "home/blockchain-basics/matic",
        "home/blockchain-basics/solidity",
        "home/blockchain-basics/transactions",
        "home/blockchain-basics/gas",
        "home/blockchain-basics/accounts",
        "home/blockchain-basics/sidechain"
      ]
    },
    {
      type: "category",
      label: "Architecture",
      items: [
        "home/architecture/overview",
        "home/architecture/security-models",
        {
          type: "category",
          label: "Bor",
          items: ["home/architecture/bor", "home/architecture/setup-bor"]
        },
        {
          type: "category",
          label: "Heimdall",
          items: []
        },
        {
          type: "category",
          label: "Contracts",
          items: ["home/architecture/contracts/staking",]
        },
        {
          type: "category",
          label: "Plasma Contracts",
          items: []
        },
        {
          type: "category",
          label: "State Sync Mechanism",
          items: []
        },
        {
          type: "category",
          label: "Validator",
          items: [
            "validator/proposers-producers-selection",
            "validator/state-sync",
            "validator/heimdall-chain",
            "validator/bor-chain",
            "validator/checkpoint-mechanism",
            "validator/liquid-delegation"
          ]
        }
      ]
    },
    {
      type: "category",
      label: "Specifications",
      items: [
        {
          type: "category",
          label: "Heimdall",
          items: [
            "home/specifications/heimdall/encoder",
            "home/specifications/heimdall/stdtx",
            {
              type: "category",
              label: "Modules",
              items: [
                "home/specifications/heimdall/modules/auth",
                "home/specifications/heimdall/modules/governance",
              ]
            },
          ]
        },
        {
          type: "category",
          label: "Bor",
          items: []
        },
        {
          type: "category",
          label: "Contracts",
          items: []
        },
        {
          type: "category",
          label: "Plasma Contracts",
          items: []
        },
        "home/specifications/peppermint",

      ]
    },
    
    "home/faq"
  ],
  development: [
    "getting-started",
    {
      type: "category",
      label: "Deploying on Matic",
      items: ["helloworld", "config-truffle"]
    },
    {
      type: "category",
      label: "Using Metamask",
      items: [
        "develop/metamask",
        "develop/metamask/custom-tokens",
        "develop/metamask/testnet",
        "develop/metamask/gas-fees",
        "develop/metamask/multiple-accounts"
      ]
    },

    {
      type: "category",
      label: "Connect to Web3",
      items: [
        "develop/key-management/getting-started",
        "develop/key-management/metamask",
        "develop/key-management/walletconnect",
        "develop/key-management/portis"
      ]
    },
    {
      type: "category",
      label: "Ethereum ↔️ Matic",
      items: [
        {
          type: "category",
          label: "Matic.js",
          items: [
            "develop/maticjs/getting-started",
            "develop/maticjs/deposit",
            "develop/maticjs/transfer",
            "develop/maticjs/withdraw",
            "develop/maticjs/api-reference"
          ]
        },
        "develop/advanced/moving-assets"
      ]
    },
    {
      type: "category",
      label: "Meta Transactions",
      items: [
        "develop/metatransactions/metatransactions",
        "develop/metatransactions/metatransactions-biconomy",
        "develop/metatransactions/metatransactions-gsn"
      ]
    },
    "develop/oracles",
    "develop/fiat-on-ramp",
    {
      type: "category",
      label: "Realtime Updates",
      items: [
        "develop/dagger",
        {
          type: "category",
          label: "Zapier - Mulitple Apps",
          items: [
            "develop/zapier/about",
            "develop/zapier/getting-started"
          ]
        },
      ]
    },
    {
      type: "category",
      label: "Decentralised Storage",
      items: ["develop/decentralised-storage/moibit"]
    },
    {
      type: "category",
      label: "Tutorials",
      items: ["develop/full-stack-dapp-with-pos"]
    },
    {
      type: "category",
      label: "Advanced",
      items: [
        "develop/advanced/calling-plasma-contracts",
        "develop/advanced/swap-assets",
        "develop/advanced/deploy-your-own-matic-testnet",
        "develop/advanced/custom-restrictions"
      ]
    }
  ],
  Integrate: [
    "integrate/getting-started",
    "integrate/flow-of-token",
    "network-config",
    {
      type: "category",
      label: "Support",
      items: [
        {
          type: "link",
          label: "Matic Faucet",
          href: "https://faucet.matic.network/"
        },
        {
          type: "link",
          label: "RPC Health",
          href: "https://status.matic.today"
        },
        {
          type: "link",
          label: "Checkpoint Status",
          href: "https://status.matic.today/#/checkpoints"
        }
      ]
    }
  ],
  Validators: [
    {
      type: "category",
      label: "Basics",
      items: [
      "validate/basics/validator",
      "validate/basics/delegator",
    ]
    },
    "validate/economics",
    "validate/technical-requirements",
    {
      type: "category",
      label: "Counter Stake: Stage 1",
      items: [
        "validate/counter-stake-stage-1/getting-started",
        "validate/counter-stake-stage-1/introduction",
        "validate/counter-stake-stage-1/linux-package-installation",
        "validate/counter-stake-stage-1/running-with-binaries",
        "validate/counter-stake-stage-1/running-with-docker",
        "validate/counter-stake-stage-1/stake-on-matic",
        "validate/counter-stake-stage-1/technical-faqs"
      ]
    },
    "validate/faqs",
    "validate/reporting-issues"
  ]
};
