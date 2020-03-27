module.exports = {
  title: 'Matic Network',
  tagline: 'Welcome to Matic Developer Documentation',
  url: 'https://docs.matic.network/',
  baseUrl: '/',
  favicon: 'img/favicon.png',
  organizationName: 'Matic Network',
  projectName: 'Matic Docs', // Usually your repo name.
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
          href: 'https://t.me/joinchat/HkoSvlDKW0qKs_kK4Ow0hQ',
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
      apiKey: '25626fae796133dc1e734c6bcaaeac3c',
      indexName: 'docsearch',
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
            'https://github.com/sanchaymittal/docusaurus-docs/blob/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
