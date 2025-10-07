# PipeGuru Developer Documentation

This repository contains the source code for the [PipeGuru Developer Documentation](https://pipeguru.com/docs). The site is built using [Docusaurus](https://docusaurus.io/), a modern static website generator that allows us to create a beautiful and organized documentation experience.

PipeGuru empowers product, marketing, and sales teams to launch mobile A/B tests and feature rollouts in minutes, without writing any code. This documentation is the primary resource for developers integrating our SDKs.

## Contributing

We welcome contributions to improve our documentation! Whether you're fixing a typo, clarifying an explanation, or adding a new guide, your help is valuable.

To get started, you'll need to have [Node.js](https://nodejs.org/en/download/) (v18 or newer) and [Yarn](https://yarnpkg.com/getting-started/install) installed.

## Installation

Clone the repository and install the dependencies:

```bash
yarn install
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
