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
          "to": "docs/develop/getting-started",
          "label": "Develop",
          "position": "left"
        },
        {
          "to": "docs/validate/basics/validator",
          "label": "Validate",
          "position": "left"
        },
        {
          "to": "docs/integrate/quickstart",
          "label": "Integrate",
          "position": "left"
        },
        {
          "href": "https://t.me/joinchat/HkoSvlDKW0qKs_kK4Ow0hQ",
          "label": "Support",
          "position": "right"
        },
        {
          "href": "https://blog.matic.network/",
          "label": "Blog",
          "position": "right"
        }
      ]
    },
    "algolia": {
      "apiKey": "c3ad4eabc5af314ea3ed331efbe0a5c4",
      "indexName": "matic_developer",
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

          "sidebarPath": "/Users/delroy/code/matic-docs/sidebars.js",
          "editUrl": "https://github.com/sanchaymittal/docusaurus-docs/blob/master/"
        },
        "theme": {
          "customCss": "/Users/delroy/code/matic-docs/src/css/custom.css"
        }
      }
    ]
  ]
};