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

Workers Builds runs the `build` script, then `deploy` for production or
`deploy:preview` for other branches. This app uses static assets and needs no Convex keys.

See the [Worker Previews migration guide](https://samebase.com/docs/cloudflare-previews-migration)
to switch an existing Worker.
