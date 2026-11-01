# Planable Logo

Planable Logo is an interactive SVG geometry study built with React. The logo runs a 3.6-second
animation loop. A control panel changes its unit size, linked arms, construction guides, position,
shape depths, spacing, rotations, and colors.

The `Switch length` control is visible in the study, but it does not change the drawing.

## Stack

- React 16
- Create React App 2
- react-dat-gui

## Install

The repository uses npm and its checked-in lock file.

```sh
npm ci
```

## Run locally

```sh
npm start
```

## Build

```sh
npm run build
```

Create React App writes the production files to `build/`.

## Deployment

GitHub Actions builds this app with Node 24 and deploys it with Alchemy. A push to
`master` updates `planable-logo` at https://planable-logo.pfp.workers.dev.
Each same-repository pull request deploys `planable-logo-pr-<number>`; closing
or merging the pull request removes that preview Worker.

Alchemy serves the files in `build/` with no fallback for missing paths.

The stack uses the `nicu` Convex team for deployment state. GitHub Actions needs
`CONVEX_ACCESS_TOKEN`, `CLOUDFLARE_API_TOKEN`, and `CLOUDFLARE_ACCOUNT_ID`.
The production Worker is retained if its stack is removed. Cloudflare Workers
Builds is disabled after the existing Worker is adopted.

For a local production deployment, build first and run `npm run deploy` with
those credentials available. The workflow also supports a production plan and
one-time adoption through its `plan_only` and `adopt` inputs.

The app keeps React 16 and Create React App 2. The build command sets
`CI=false` and `NODE_OPTIONS=--openssl-legacy-provider`. The deployment-only
Convex package has a newer optional React peer, so `.npmrc` enables legacy peer
resolution for both `npm install` and `npm ci` without upgrading the app.
