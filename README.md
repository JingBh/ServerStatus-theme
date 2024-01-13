# ServerStatus-theme

A custom theme for [ServerStatus-Rust](https://github.com/zdz/ServerStatus-Rust), made for personal use.

See it in action: [status.jingbh.cloud](https://status.jingbh.cloud)

## Notable Changes

Some notable differences from the official theme includes:

- Card-styled layout
- Reduced polling rate to 2s
- Removed the ping test section
- Added a one-click deployment command generator

## Deployment

Clone the repository, run `yarn build` to build the assets, then follow [these instructions](https://github.com/zdz/ServerStatus-Rust/discussions/37) for deployment.

## Development

Set your `ServerStatus-Rust` instance's URL in the `VITE_SERVER_URL` environment variable (`.env` files are supported), then the Vite development server will be configured to proxy requests to your server.
