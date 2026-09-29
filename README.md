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

Run the build first. Both deployment commands publish `build/` through Cloudflare Workers Static
Assets.

- `npm run deploy` deploys to production.
- `npm run deploy:preview` deploys a Worker Preview without changing production.


## Cloudflare Worker Previews

Workers Builds runs `npm run build`, then `npm run deploy` for the production
branch or `npm run deploy:preview` for other branches. The preview command uses
native Worker Previews with Wrangler 4.136.2. The empty `previews` config keeps
this app assets-only; no Convex keys or runtime secrets are required.

For an existing Worker, first use **Settings > Builds > Set up Worker Previews**
and restore the commands above after Cloudflare replaces the preview command.
Keep the existing build root and enable non-production branch builds. Verify the
new preview URL and application before completing the rollout.

Build before any manual deploy. To check the production package without an upload,
run `npm exec -- wrangler deploy --dry-run` after the build.
Worker Previews has no dry-run mode.
See the [Worker Previews configuration](https://developers.cloudflare.com/workers/previews/configuration/)
and [existing Worker setup](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#existing-workers-connected-to-builds).
