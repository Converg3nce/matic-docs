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
      "logo": {
        "alt": "My Site Logo",
        "src": "img/logo.png"
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
        }
      ]
    },
    "algolia": {
      "apiKey": "25626fae796133dc1e734c6bcaaeac3c",
      "indexName": "docsearch",
      "algoliaOptions": {}
    },
    "footer": {
      "style": "dark",
      "links": [
        {
          "title": "Docs",
          "items": [
            {
              "label": "Style Guide",
              "to": "docs/doc1"
            },
            {
              "label": "Second Doc",
              "to": "docs/doc2"
            }
          ]
        },
        {
          "title": "Community",
          "items": [
            {
              "label": "Stack Overflow",
              "href": "https://stackoverflow.com/questions/tagged/docusaurus"
            },
            {
              "label": "Discord",
              "href": "https://discordapp.com/invite/docusaurus"
            }
          ]
        },
        {
          "title": "Social",
          "items": [
            {
              "label": "Blog",
              "to": "blog"
            },
            {
              "label": "GitHub",
              "href": "https://github.com/facebook/docusaurus"
            },
            {
              "label": "Twitter",
              "href": "https://twitter.com/docusaurus"
            }
          ]
        }
      ],
      "copyright": "Copyright © 2020 My Project, Inc. Built with Docusaurus."
    }
  },
  "title": "Matic Network",
  "tagline": "The tagline of my site",
  "url": "https://your-docusaurus-test-site.com",
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