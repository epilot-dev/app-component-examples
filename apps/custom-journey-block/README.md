# Developing a custom journey block


## Development Mode

To ease the local development the epilot apps have the option to enable a development mode. See docs [here](https://docs.epilot.io/apps/building-apps/development-mode) for more information.

This will allow you to run the custom journey block in a local development environment and see changes immediately without having to redeploy the app.

## Running the example (from root)

```bash
pnpm run custom-journey-block:dev
```

This spins up a local http server on port 3000 and exposes the `dist` folder which contains the built `bundle.js` file.

