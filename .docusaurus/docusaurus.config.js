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
        "alt": "Matic",
        "src": "/img/logo.svg",
        "srcDark": "/img/logo-white.svg"
      },
      "links": [
        {
          "to": "docs/home/new-to-matic",
          "label": "Basics",
          "position": "left"
        },
        {
          "to": "docs/getting-started",
          "label": "DAppDev",
          "position": "left"
        },
        {
          "to": "docs/integrate/quickstart",
          "label": "Integrate",
          "position": "left"
        },
        {
          "to": "docs/validate/basics/validator",
          "label": "Validate",
          "position": "left"
        },
        {
          "to": "docs/contribute/orientation",
          "label": "Contribute",
          "position": "left"
        },
        {
          "href": "https://blog.matic.network/",
          "label": "Blog",
          "position": "right"
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
  "url": "https://docs.matic.network/",
  "baseUrl": "/",
  "favicon": "img/favicon.png",
  "organizationName": "Matic Network",
  "projectName": "Matic Docs",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "sidebarPath": "/Users/mnthn/Documents/matic-docs/sidebars.js",
          "editUrl": "https://github.com/sanchaymittal/docusaurus-docs/blob/master/"
        },
        "theme": {
          "customCss": "/Users/mnthn/Documents/matic-docs/src/css/custom.css"
        }
      }
    ]
  ]
};