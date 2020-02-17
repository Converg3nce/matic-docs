/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  Resources: [
    'resources/new-to-matic',
    {
      type: 'category',
      label: 'Blockchain Basics',
      items: ['resources/blockchain-basics/blockchain','resources/blockchain-basics/blockchain-types', 'resources/blockchain-basics/consensus-mechanism','resources/blockchain-basics/ethereum','resources/blockchain-basics/solidity', 'resources/blockchain-basics/transactions','resources/blockchain-basics/gas', 'resources/blockchain-basics/accounts'],
    },
    'resources/matic-sidechain', 'resources/matic-architecture',
    {
      type: 'category',
      label: 'Advanced Concepts',
      items: ['resources/matic-moving-assets', 'resources/matic-security-models','resources/tutorial-ethindia-workshop-solidity', 'resources/tutorial-ethindia-workshop-dapp']
    },
  
],
  Tutorials: [
    'tutorial-getting-started',
{
    type: 'category',
    label: 'QuickStart',
    items: ['quickstart','quickstart-helloworld','quickstart-metamask']
  },
  {
    type: 'category',
    label: 'Integrations',
    items: [
      {
        type: 'category',
        label: 'Key Management Strategies',
        items: ['integrations/key-management/getting-started','integrations/key-management/metamask','integrations/key-management/walletconnect','integrations/key-management/portis']
      },
    {
      type: 'category',
      label: 'Meta Transactions',
      items: ['tutorial-metatransactions', 'tutorial-metatransactions-biconomy', 'tutorial-metatransactions-gsn']
    },
    'tutorial-oracles',
    'tutorial-fiat-on-ramp',
    {
      type: 'category',
      label: 'Dagger on Ethereum',
      items: ['integrations/zapier/about','integrations/zapier/getting-started']
    },
    {
      type: 'category',
      label: 'Decentralised Storage',
      items: ['integrations/decentralised-storage/moibit']
    },
  ]},
  {
    type: 'category',
    label: 'Dagger',
    items: ['dagger/getting-started']
  },
  ],
  Staking: [
    'staking/economics',
    'staking/technical-requirements',
    {
      type: 'category',
      label: 'Counter Stake: Stage 1',
      items: ['staking/counter-stake-stage-1/getting-started','staking/counter-stake-stage-1/introduction','staking/counter-stake-stage-1/linux-package-installation','staking/counter-stake-stage-1/running-with-binaries','staking/counter-stake-stage-1/stake-on-matic','staking/counter-stake-stage-1/technical-faqs']
    },
    'staking/faqs'
  ]
};
