
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
  path: '/docs/:route',
  component: ComponentCreator('/docs/:route'),
  
  routes: [
{
  path: '/docs/dagger/getting-started',
  component: ComponentCreator('/docs/dagger/getting-started'),
  exact: true,
  
},
{
  path: '/docs/integrations/decentralised-storage/moibit',
  component: ComponentCreator('/docs/integrations/decentralised-storage/moibit'),
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
  path: '/docs/quickstart',
  component: ComponentCreator('/docs/quickstart'),
  exact: true,
  
},
{
  path: '/docs/quickstart-helloworld',
  component: ComponentCreator('/docs/quickstart-helloworld'),
  exact: true,
  
},
{
  path: '/docs/quickstart-metamask',
  component: ComponentCreator('/docs/quickstart-metamask'),
  exact: true,
  
},
{
  path: '/docs/resources/blockchain-basics/accounts',
  component: ComponentCreator('/docs/resources/blockchain-basics/accounts'),
  exact: true,
  
},
{
  path: '/docs/resources/blockchain-basics/blockchain',
  component: ComponentCreator('/docs/resources/blockchain-basics/blockchain'),
  exact: true,
  
},
{
  path: '/docs/resources/blockchain-basics/blockchain-types',
  component: ComponentCreator('/docs/resources/blockchain-basics/blockchain-types'),
  exact: true,
  
},
{
  path: '/docs/resources/blockchain-basics/consensus-mechanism',
  component: ComponentCreator('/docs/resources/blockchain-basics/consensus-mechanism'),
  exact: true,
  
},
{
  path: '/docs/resources/blockchain-basics/ethereum',
  component: ComponentCreator('/docs/resources/blockchain-basics/ethereum'),
  exact: true,
  
},
{
  path: '/docs/resources/blockchain-basics/gas',
  component: ComponentCreator('/docs/resources/blockchain-basics/gas'),
  exact: true,
  
},
{
  path: '/docs/resources/blockchain-basics/solidity',
  component: ComponentCreator('/docs/resources/blockchain-basics/solidity'),
  exact: true,
  
},
{
  path: '/docs/resources/blockchain-basics/transactions',
  component: ComponentCreator('/docs/resources/blockchain-basics/transactions'),
  exact: true,
  
},
{
  path: '/docs/resources/matic-architecture',
  component: ComponentCreator('/docs/resources/matic-architecture'),
  exact: true,
  
},
{
  path: '/docs/resources/matic-moving-assets',
  component: ComponentCreator('/docs/resources/matic-moving-assets'),
  exact: true,
  
},
{
  path: '/docs/resources/matic-security-models',
  component: ComponentCreator('/docs/resources/matic-security-models'),
  exact: true,
  
},
{
  path: '/docs/resources/matic-sidechain',
  component: ComponentCreator('/docs/resources/matic-sidechain'),
  exact: true,
  
},
{
  path: '/docs/resources/new-to-matic',
  component: ComponentCreator('/docs/resources/new-to-matic'),
  exact: true,
  
},
{
  path: '/docs/resources/tutorial-ethindia-workshop-dapp',
  component: ComponentCreator('/docs/resources/tutorial-ethindia-workshop-dapp'),
  exact: true,
  
},
{
  path: '/docs/resources/tutorial-ethindia-workshop-solidity',
  component: ComponentCreator('/docs/resources/tutorial-ethindia-workshop-solidity'),
  exact: true,
  
},
{
  path: '/docs/staking/counter-stake-stage-1/getting-started',
  component: ComponentCreator('/docs/staking/counter-stake-stage-1/getting-started'),
  exact: true,
  
},
{
  path: '/docs/staking/counter-stake-stage-1/introduction',
  component: ComponentCreator('/docs/staking/counter-stake-stage-1/introduction'),
  exact: true,
  
},
{
  path: '/docs/staking/counter-stake-stage-1/linux-package-installation',
  component: ComponentCreator('/docs/staking/counter-stake-stage-1/linux-package-installation'),
  exact: true,
  
},
{
  path: '/docs/staking/counter-stake-stage-1/running-with-binaries',
  component: ComponentCreator('/docs/staking/counter-stake-stage-1/running-with-binaries'),
  exact: true,
  
},
{
  path: '/docs/staking/counter-stake-stage-1/stake-on-matic',
  component: ComponentCreator('/docs/staking/counter-stake-stage-1/stake-on-matic'),
  exact: true,
  
},
{
  path: '/docs/staking/counter-stake-stage-1/technical-faqs',
  component: ComponentCreator('/docs/staking/counter-stake-stage-1/technical-faqs'),
  exact: true,
  
},
{
  path: '/docs/staking/economics',
  component: ComponentCreator('/docs/staking/economics'),
  exact: true,
  
},
{
  path: '/docs/staking/faqs',
  component: ComponentCreator('/docs/staking/faqs'),
  exact: true,
  
},
{
  path: '/docs/staking/running-with-docker',
  component: ComponentCreator('/docs/staking/running-with-docker'),
  exact: true,
  
},
{
  path: '/docs/staking/technical-requirements',
  component: ComponentCreator('/docs/staking/technical-requirements'),
  exact: true,
  
},
{
  path: '/docs/staking/tutorial-oracles',
  component: ComponentCreator('/docs/staking/tutorial-oracles'),
  exact: true,
  
},
{
  path: '/docs/tutorial-fiat-on-ramp',
  component: ComponentCreator('/docs/tutorial-fiat-on-ramp'),
  exact: true,
  
},
{
  path: '/docs/tutorial-getting-started',
  component: ComponentCreator('/docs/tutorial-getting-started'),
  exact: true,
  
},
{
  path: '/docs/tutorial-metatransactions',
  component: ComponentCreator('/docs/tutorial-metatransactions'),
  exact: true,
  
},
{
  path: '/docs/tutorial-metatransactions-biconomy',
  component: ComponentCreator('/docs/tutorial-metatransactions-biconomy'),
  exact: true,
  
},
{
  path: '/docs/tutorial-metatransactions-gsn',
  component: ComponentCreator('/docs/tutorial-metatransactions-gsn'),
  exact: true,
  
},
{
  path: '/docs/tutorial-oracles',
  component: ComponentCreator('/docs/tutorial-oracles'),
  exact: true,
  
}],
},
  
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
