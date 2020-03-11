export default {
  "plugins": [
    [
      "@docusaurus/plugin-ideal-image",
      {
        "quality": 70,
        "max": 1030,
        "min": 640,
        "steps": 2
      }
    ]
  ],
  "themes": [],
  "customFields": {},
  "themeConfig": {
    "navbar": {
      "title": "Developer",
      "logo": {
        "alt": "My Site Logo",
        "src": "/img/logo.svg",
        "srcDark": "/img/logo-white.svg"
      },
      "links": [
        {
          "to": "docs/resources/new-to-matic",
          "label": "Introduction",
          "position": "left"
        },
        {
          "to": "docs/getting-started",
          "label": "Development",
          "position": "left"
        },
        {
          "to": "docs/staking/economics",
          "label": "Validators",
          "position": "left"
        },
        {
          "to": "showcase",
          "label": "Showcase",
          "position": "right"
        },
        {
          "href": "https://github.com/facebook/docusaurus",
          "label": "GitHub",
          "position": "right"
        },
        {
          "href": "https://blog.matic.network/",
          "label": "Blog",
          "position": "left"
        }
      ]
    },
    "algolia": {
      "apiKey": "25626fae796133dc1e734c6bcaaeac3c",
      "indexName": "docsearch",
      "algoliaOptions": {}
    }
  },
  "title": "Matic Network",
  "tagline": "Welcome to Matic Developer Documentation",
  "url": "docs.matic.network",
  "baseUrl": "/",
  "favicon": "img/favicon.png",
  "organizationName": "Matic Network",
  "projectName": "Matic Docs",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/sanchaymittal/matic/matic-docs/sidebars.js",
          "editUrl": "https://github.com/sanchaymittal/docusaurus-docs/blob/master/"
        },
        "theme": {
          "customCss": "/Users/sanchaymittal/matic/matic-docs/src/css/custom.css"
        }
      }
    ]
  ]
};