/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  introduction: [
    'resources/new-to-matic',
    {
      type: 'category',
      label: 'Blockchain Basics',
      items: ['resources/blockchain-basics/blockchain', 'resources/blockchain-basics/blockchain-types', 'resources/blockchain-basics/consensus-mechanism', 'resources/blockchain-basics/ethereum', 'resources/blockchain-basics/matic', 'resources/blockchain-basics/solidity', 'resources/blockchain-basics/transactions', 'resources/blockchain-basics/gas', 'resources/blockchain-basics/accounts'],
    },
    'resources/sidechain', 'resources/architecture','advanced/security-models',
    'resources/faq'

  ],
  development: [
    'getting-started',
    'helloworld',
    'metamask',
    {
      type: 'category',
    label: 'Connect to Web3',
    items: ['integrations/key-management/getting-started', 'integrations/key-management/metamask', 'integrations/key-management/walletconnect', 'integrations/key-management/portis']
  },
  {
    type: 'category',
    label: 'Meta Transactions',
    items: ['integrations/metatransactions/metatransactions', 'integrations/metatransactions/metatransactions-biconomy', 'integrations/metatransactions/metatransactions-gsn']
  },
  'integrations/oracles',
  'integrations/fiat-on-ramp',
  {
    type: 'category',
    label: 'Dagger on Ethereum',
    items: ['integrations/zapier/about', 'integrations/zapier/getting-started']
  },
  {
    type: 'category',
    label: 'Decentralised Storage',
    items: ['integrations/decentralised-storage/moibit']
  },
    {
      type: 'category',
      label: 'Tools',
      items: [
    'dagger/getting-started',
    {
      type: 'category',
      label: 'Matic SDK',
      items: ['sdk/matic-js', 'sdk/api-reference']
    },
    ]},
    'network-config',
    {
      type: 'category',
      label: 'Advanced',
      items: ['tutorial-advanced/full-stack-dapp-with-pos', 'advanced/calling-plasma-contracts', 'advanced/swap-assets', 'advanced/moving-assets', 'advanced/deploy-your-own-matic-testnet', 'advanced/custom-restrictions']
    },
  ],
  Integrations: [
    'integrations/getting-started',
  ],
  Validators: [
    'staking/economics',
    'staking/technical-requirements',
    {
      type: 'category',
      label: 'Counter Stake: Stage 1',
      items: ['staking/counter-stake-stage-1/getting-started', 'staking/counter-stake-stage-1/introduction', 'staking/counter-stake-stage-1/linux-package-installation', 'staking/counter-stake-stage-1/running-with-binaries', 'staking/counter-stake-stage-1/running-with-docker', 'staking/counter-stake-stage-1/stake-on-matic', 'staking/counter-stake-stage-1/technical-faqs']
    },
    'staking/faqs'
  ]
};
