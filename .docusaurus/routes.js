
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  
{
  path: '/',
  component: ComponentCreator('/'),
  exact: true,
  
},
{
  path: '/blog',
  component: ComponentCreator('/blog'),
  exact: true,
  
},
{
  path: '/blog/hello-world',
  component: ComponentCreator('/blog/hello-world'),
  exact: true,
  
},
{
  path: '/blog/hola',
  component: ComponentCreator('/blog/hola'),
  exact: true,
  
},
{
  path: '/blog/tags',
  component: ComponentCreator('/blog/tags'),
  exact: true,
  
},
{
  path: '/blog/tags/docusaurus',
  component: ComponentCreator('/blog/tags/docusaurus'),
  exact: true,
  
},
{
  path: '/blog/tags/facebook',
  component: ComponentCreator('/blog/tags/facebook'),
  exact: true,
  
},
{
  path: '/blog/tags/hello',
  component: ComponentCreator('/blog/tags/hello'),
  exact: true,
  
},
{
  path: '/blog/tags/hola',
  component: ComponentCreator('/blog/tags/hola'),
  exact: true,
  
},
{
  path: '/blog/welcome',
  component: ComponentCreator('/blog/welcome'),
  exact: true,
  
},
{
  path: '/showcase/',
  component: ComponentCreator('/showcase/'),
  exact: true,
  
},
{
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/advanced/calling-plasma-contracts',
  component: ComponentCreator('/docs/advanced/calling-plasma-contracts'),
  exact: true,
  
},
{
  path: '/docs/advanced/custom-restrictions',
  component: ComponentCreator('/docs/advanced/custom-restrictions'),
  exact: true,
  
},
{
  path: '/docs/advanced/deploy-your-own-matic-testnet',
  component: ComponentCreator('/docs/advanced/deploy-your-own-matic-testnet'),
  exact: true,
  
},
{
  path: '/docs/advanced/moving-assets',
  component: ComponentCreator('/docs/advanced/moving-assets'),
  exact: true,
  
},
{
  path: '/docs/advanced/swap-assets',
  component: ComponentCreator('/docs/advanced/swap-assets'),
  exact: true,
  
},
{
  path: '/docs/config-truffle',
  component: ComponentCreator('/docs/config-truffle'),
  exact: true,
  
},
{
  path: '/docs/dagger/getting-started',
  component: ComponentCreator('/docs/dagger/getting-started'),
  exact: true,
  
},
{
  path: '/docs/getting-started',
  component: ComponentCreator('/docs/getting-started'),
  exact: true,
  
},
{
  path: '/docs/helloworld',
  component: ComponentCreator('/docs/helloworld'),
  exact: true,
  
},
{
  path: '/docs/home/architecture/bor',
  component: ComponentCreator('/docs/home/architecture/bor'),
  exact: true,
  
},
{
  path: '/docs/home/architecture/contracts/staking',
  component: ComponentCreator('/docs/home/architecture/contracts/staking'),
  exact: true,
  
},
{
  path: '/docs/home/architecture/overview',
  component: ComponentCreator('/docs/home/architecture/overview'),
  exact: true,
  
},
{
  path: '/docs/home/architecture/security-models',
  component: ComponentCreator('/docs/home/architecture/security-models'),
  exact: true,
  
},
{
  path: '/docs/home/architecture/setup-bor',
  component: ComponentCreator('/docs/home/architecture/setup-bor'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/accounts',
  component: ComponentCreator('/docs/home/blockchain-basics/accounts'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/blockchain',
  component: ComponentCreator('/docs/home/blockchain-basics/blockchain'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/blockchain-types',
  component: ComponentCreator('/docs/home/blockchain-basics/blockchain-types'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/consensus-mechanism',
  component: ComponentCreator('/docs/home/blockchain-basics/consensus-mechanism'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/ethereum',
  component: ComponentCreator('/docs/home/blockchain-basics/ethereum'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/gas',
  component: ComponentCreator('/docs/home/blockchain-basics/gas'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/matic',
  component: ComponentCreator('/docs/home/blockchain-basics/matic'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/sidechain',
  component: ComponentCreator('/docs/home/blockchain-basics/sidechain'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/solidity',
  component: ComponentCreator('/docs/home/blockchain-basics/solidity'),
  exact: true,
  
},
{
  path: '/docs/home/blockchain-basics/transactions',
  component: ComponentCreator('/docs/home/blockchain-basics/transactions'),
  exact: true,
  
},
{
  path: '/docs/home/faq',
  component: ComponentCreator('/docs/home/faq'),
  exact: true,
  
},
{
  path: '/docs/home/mapped-tokens',
  component: ComponentCreator('/docs/home/mapped-tokens'),
  exact: true,
  
},
{
  path: '/docs/home/new-to-matic',
  component: ComponentCreator('/docs/home/new-to-matic'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/encoder',
  component: ComponentCreator('/docs/home/specifications/heimdall/encoder'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/modules/auth',
  component: ComponentCreator('/docs/home/specifications/heimdall/modules/auth'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/modules/bank',
  component: ComponentCreator('/docs/home/specifications/heimdall/modules/bank'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/modules/bor',
  component: ComponentCreator('/docs/home/specifications/heimdall/modules/bor'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/modules/checkpoints',
  component: ComponentCreator('/docs/home/specifications/heimdall/modules/checkpoints'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/modules/clerk',
  component: ComponentCreator('/docs/home/specifications/heimdall/modules/clerk'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/modules/governance',
  component: ComponentCreator('/docs/home/specifications/heimdall/modules/governance'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/modules/staking',
  component: ComponentCreator('/docs/home/specifications/heimdall/modules/staking'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/modules/topup',
  component: ComponentCreator('/docs/home/specifications/heimdall/modules/topup'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/heimdall/stdtx',
  component: ComponentCreator('/docs/home/specifications/heimdall/stdtx'),
  exact: true,
  
},
{
  path: '/docs/home/specifications/peppermint',
  component: ComponentCreator('/docs/home/specifications/peppermint'),
  exact: true,
  
},
{
  path: '/docs/integrate/flow-of-token',
  component: ComponentCreator('/docs/integrate/flow-of-token'),
  exact: true,
  
},
{
  path: '/docs/integrate/getting-started',
  component: ComponentCreator('/docs/integrate/getting-started'),
  exact: true,
  
},
{
  path: '/docs/integrations/decentralised-storage/moibit',
  component: ComponentCreator('/docs/integrations/decentralised-storage/moibit'),
  exact: true,
  
},
{
  path: '/docs/integrations/fiat-on-ramp',
  component: ComponentCreator('/docs/integrations/fiat-on-ramp'),
  exact: true,
  
},
{
  path: '/docs/integrations/getting-started',
  component: ComponentCreator('/docs/integrations/getting-started'),
  exact: true,
  
},
{
  path: '/docs/integrations/key-management/getting-started',
  component: ComponentCreator('/docs/integrations/key-management/getting-started'),
  exact: true,
  
},
{
  path: '/docs/integrations/key-management/metamask',
  component: ComponentCreator('/docs/integrations/key-management/metamask'),
  exact: true,
  
},
{
  path: '/docs/integrations/key-management/portis',
  component: ComponentCreator('/docs/integrations/key-management/portis'),
  exact: true,
  
},
{
  path: '/docs/integrations/key-management/walletconnect',
  component: ComponentCreator('/docs/integrations/key-management/walletconnect'),
  exact: true,
  
},
{
  path: '/docs/integrations/metatransactions/metatransactions',
  component: ComponentCreator('/docs/integrations/metatransactions/metatransactions'),
  exact: true,
  
},
{
  path: '/docs/integrations/metatransactions/metatransactions-biconomy',
  component: ComponentCreator('/docs/integrations/metatransactions/metatransactions-biconomy'),
  exact: true,
  
},
{
  path: '/docs/integrations/metatransactions/metatransactions-gsn',
  component: ComponentCreator('/docs/integrations/metatransactions/metatransactions-gsn'),
  exact: true,
  
},
{
  path: '/docs/integrations/oracles',
  component: ComponentCreator('/docs/integrations/oracles'),
  exact: true,
  
},
{
  path: '/docs/integrations/zapier/about',
  component: ComponentCreator('/docs/integrations/zapier/about'),
  exact: true,
  
},
{
  path: '/docs/integrations/zapier/getting-started',
  component: ComponentCreator('/docs/integrations/zapier/getting-started'),
  exact: true,
  
},
{
  path: '/docs/metamask',
  component: ComponentCreator('/docs/metamask'),
  exact: true,
  
},
{
  path: '/docs/metamask/conf-custom-tokens-metamask',
  component: ComponentCreator('/docs/metamask/conf-custom-tokens-metamask'),
  exact: true,
  
},
{
  path: '/docs/metamask/conf-testnet-metamask',
  component: ComponentCreator('/docs/metamask/conf-testnet-metamask'),
  exact: true,
  
},
{
  path: '/docs/metamask/gas-fees',
  component: ComponentCreator('/docs/metamask/gas-fees'),
  exact: true,
  
},
{
  path: '/docs/metamask/multiple-accounts',
  component: ComponentCreator('/docs/metamask/multiple-accounts'),
  exact: true,
  
},
{
  path: '/docs/network-config',
  component: ComponentCreator('/docs/network-config'),
  exact: true,
  
},
{
  path: '/docs/sdk/api-reference',
  component: ComponentCreator('/docs/sdk/api-reference'),
  exact: true,
  
},
{
  path: '/docs/sdk/deposit',
  component: ComponentCreator('/docs/sdk/deposit'),
  exact: true,
  
},
{
  path: '/docs/sdk/getting-started',
  component: ComponentCreator('/docs/sdk/getting-started'),
  exact: true,
  
},
{
  path: '/docs/sdk/transfer',
  component: ComponentCreator('/docs/sdk/transfer'),
  exact: true,
  
},
{
  path: '/docs/sdk/withdraw',
  component: ComponentCreator('/docs/sdk/withdraw'),
  exact: true,
  
},
{
  path: '/docs/tutorial-advanced/full-stack-dapp-with-pos',
  component: ComponentCreator('/docs/tutorial-advanced/full-stack-dapp-with-pos'),
  exact: true,
  
},
{
  path: '/docs/validate/basics/delegator',
  component: ComponentCreator('/docs/validate/basics/delegator'),
  exact: true,
  
},
{
  path: '/docs/validate/basics/validator',
  component: ComponentCreator('/docs/validate/basics/validator'),
  exact: true,
  
},
{
  path: '/docs/validate/counter-stake-stage-1/getting-started',
  component: ComponentCreator('/docs/validate/counter-stake-stage-1/getting-started'),
  exact: true,
  
},
{
  path: '/docs/validate/counter-stake-stage-1/introduction',
  component: ComponentCreator('/docs/validate/counter-stake-stage-1/introduction'),
  exact: true,
  
},
{
  path: '/docs/validate/counter-stake-stage-1/linux-package-installation',
  component: ComponentCreator('/docs/validate/counter-stake-stage-1/linux-package-installation'),
  exact: true,
  
},
{
  path: '/docs/validate/counter-stake-stage-1/running-with-binaries',
  component: ComponentCreator('/docs/validate/counter-stake-stage-1/running-with-binaries'),
  exact: true,
  
},
{
  path: '/docs/validate/counter-stake-stage-1/running-with-docker',
  component: ComponentCreator('/docs/validate/counter-stake-stage-1/running-with-docker'),
  exact: true,
  
},
{
  path: '/docs/validate/counter-stake-stage-1/stake-on-matic',
  component: ComponentCreator('/docs/validate/counter-stake-stage-1/stake-on-matic'),
  exact: true,
  
},
{
  path: '/docs/validate/counter-stake-stage-1/technical-faqs',
  component: ComponentCreator('/docs/validate/counter-stake-stage-1/technical-faqs'),
  exact: true,
  
},
{
  path: '/docs/validate/deploy-your-own-matic-testnet',
  component: ComponentCreator('/docs/validate/deploy-your-own-matic-testnet'),
  exact: true,
  
},
{
  path: '/docs/validate/economics',
  component: ComponentCreator('/docs/validate/economics'),
  exact: true,
  
},
{
  path: '/docs/validate/faqs',
  component: ComponentCreator('/docs/validate/faqs'),
  exact: true,
  
},
{
  path: '/docs/validate/heimdall/configure-heimdall',
  component: ComponentCreator('/docs/validate/heimdall/configure-heimdall'),
  exact: true,
  
},
{
  path: '/docs/validate/heimdall/install-heimdall',
  component: ComponentCreator('/docs/validate/heimdall/install-heimdall'),
  exact: true,
  
},
{
  path: '/docs/validate/heimdall/run-heimdall',
  component: ComponentCreator('/docs/validate/heimdall/run-heimdall'),
  exact: true,
  
},
{
  path: '/docs/validate/reporting-issues',
  component: ComponentCreator('/docs/validate/reporting-issues'),
  exact: true,
  
},
{
  path: '/docs/validate/technical-requirements',
  component: ComponentCreator('/docs/validate/technical-requirements'),
  exact: true,
  
},
{
  path: '/docs/validator/bor-chain',
  component: ComponentCreator('/docs/validator/bor-chain'),
  exact: true,
  
},
{
  path: '/docs/validator/checkpoint-mechanism',
  component: ComponentCreator('/docs/validator/checkpoint-mechanism'),
  exact: true,
  
},
{
  path: '/docs/validator/heimdall-chain',
  component: ComponentCreator('/docs/validator/heimdall-chain'),
  exact: true,
  
},
{
  path: '/docs/validator/liquid-delegation',
  component: ComponentCreator('/docs/validator/liquid-delegation'),
  exact: true,
  
},
{
  path: '/docs/validator/proposers-producers-selection',
  component: ComponentCreator('/docs/validator/proposers-producers-selection'),
  exact: true,
  
},
{
  path: '/docs/validator/state-sync',
  component: ComponentCreator('/docs/validator/state-sync'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
