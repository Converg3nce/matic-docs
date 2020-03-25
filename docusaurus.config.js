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
        { to: 'docs/getting-started', label: 'DAppDev', position: 'left' },
        { to: 'docs/integrate/quickstart', label: 'Integrate', position: 'left' },
        { to: 'docs/validate/basics/validator', label: 'Validate', position: 'left' },
        { to: 'docs/contribute/orientation', label: 'Contribute', position: 'left' }, 
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
    // footer: {
    //   style: 'dark',
    //   links: [
    //     {
    //       title: 'Docs',
    //       items: [
    //         {
    //           label: 'Style Guide',
    //           to: 'docs/doc1',
    //         },
    //         {
    //           label: 'Second Doc',
    //           to: 'docs/doc2',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Stack Overflow',
    //           href: 'https://stackoverflow.com/questions/tagged/docusaurus',
    //         },
    //         {
    //           label: 'Discord',
    //           href: 'https://discordapp.com/invite/docusaurus',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Social',
    //       items: [
    //         {
    //           label: 'Blog',
    //           to: 'blog',
    //         },
    //         {
    //           label: 'GitHub',
    //           href: 'https://github.com/facebook/docusaurus',
    //         },
    //         {
    //           label: 'Twitter',
    //           href: 'https://twitter.com/docusaurus',
    //         },
    //       ],
    //     },
    //   ],
    //   copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    // },
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
