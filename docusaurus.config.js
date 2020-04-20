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
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Developer',
      logo: {
        alt: 'Matic',
        src: '/img/logo.svg',
        srcDark: '/img/logo-white.svg'
      },
      links: [
        { to: 'docs/home/new-to-matic', label: 'Basics', position: 'left' },
        { to: 'docs/develop/getting-started', label: 'Develop', position: 'left' },
        { to: 'docs/validate/basics/validator', label: 'Validate', position: 'left' },
        { to: 'docs/integrate/quickstart', label: 'Integrate', position: 'left' },
        // { to: 'docs/contribute/orientation', label: 'Contribute', position: 'left' },
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
      ],
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
