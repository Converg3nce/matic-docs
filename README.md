# Matic-Docs

- To add a new document, please add your files under the Dir: ./docs
- Add this to top of your Markdown file. 
```
---
id: <Add-you-docId-Here>
title: <Title of the Doc>
---
``` 
- And update the Sidebar.js.

### Installation

```bash
$ yarn
```

### Local Development

```bash
$ yarn start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```bash
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
