module.exports = {
  title: 'Matic Network',
  tagline: 'Welcome to Matic Developer Documentation',
  url: 'https://docs.matic.network/',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'Matic Network',
  projectName: 'matic-docs',
  customFields: {
    description:
      'Build your next blockchain app on Matic.',
  },
  themes: ['@docusaurus/theme-live-codeblock'],
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        path: 'docs',
        include: ['**/*.md', '**/*.mdx'],
        sidebarPath: '',
        docLayoutComponent: '@theme/DocPage',
        docItemComponent: '@theme/DocItem',
        showLastUpdateAuthor: false,
        showLastUpdateTime: true,
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
      },
    ],
  ],
  themeConfig: {
    navbar: {
      hideOnScroll: true,
      title: 'Developer',
      logo: {
        alt: 'Matic logo',
        src: '/img/logo.svg',
        srcDark: '/img/logo-white.svg'
      },
      links: [
        { to: 'docs/home/new-to-matic', label: 'Basics', position: 'left' ,activeBasePath: 'docs' },
        { to: 'docs/develop/getting-started', label: 'Develop', position: 'left' ,activeBasePath: 'docs'},
        { to: 'docs/validate/orientation', label: 'Validate', position: 'left' ,activeBasePath: 'docs'},
        { to: 'docs/integrate/quickstart', label: 'Integrate', position: 'left' ,activeBasePath: 'docs'},
        { to: 'docs/contribute/orientation', label: 'Contribute', position: 'left' ,activeBasePath: 'docs'},
        {
          href: 'https://forum.matic.network',
          label: 'Support',
          position: 'right',
        }, 
        {
          href: 'https://blog.matic.network/',
          label: 'Blog',
          position: 'right',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    announcementBar: {
      id: 'support_us',
      content:
        '⭐️ Validators, we are moving to the <a target="_blank" rel="noopener noreferrer" href="/docs/validate/orientation">Counter Stage-2</a>! ⭐️',
      backgroundColor: '#2b6def', // Defaults to `#fff`
      textColor: '#fff', // Defaults to `#000`
    },
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    algolia: {
      apiKey: 'c3ad4eabc5af314ea3ed331efbe0a5c4',
      indexName: 'matic_developer',
      algoliaOptions: {},
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/maticnetwork/matic-docs/tree/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
