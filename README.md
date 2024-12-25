# ServerStatus-theme

A custom theme for [ServerStatus-Rust](https://github.com/zdz/ServerStatus-Rust), made for personal use.

See it in action: [status.jingbh.cloud](https://status.jingbh.cloud)

## Notable Changes

Some notable differences from the official theme includes:

- Card-styled layout
- Reduced polling rate to 2s
- Removed the ping test section
- Added a one-click deployment command generator

### Server Icon

An icon will be added before the server name if the `type` of that server matches one of the following:

- <img src="https://github.com/twbs/icons/raw/main/icons/display.svg" width="24" height="16">: `PC`
- <img src="https://github.com/twbs/icons/raw/main/icons/motherboard.svg" width="24" height="16">: `Board`
- <img src="https://github.com/twbs/icons/raw/main/icons/router.svg" width="24" height="16">: `Router`
- <img src="https://github.com/twbs/icons/raw/main/icons/hdd-network.svg" width="24" height="16">: Any string containing `VM` or the string `Hyper-V`

## Deployment

Clone the repository, run `yarn build` to build the assets (or download pre-built assets from Actions), then follow [these instructions](https://github.com/zdz/ServerStatus-Rust/discussions/37) for deployment.

### Routing

Several routes need to be set to proxy API calls to the backend, including:

- `/detail`
- `/i`
- `/json/stats.json`
- `/map`
- `/report`

It is recommended to let the reverse proxy handle the routing, for example, Nginx, Caddy, or even use `routes` in `vercel.json` if deploying to Vercel.

Alternatively, you can set `VITE_SERVER_URL` to the backend's URL (without a trailing slash) when building to let the frontend handle the routing. However, note that this approach does not cover the `/report` path, so clients will have to set their report URL to the actual backend.

### Customization

You may customize some of the UI elements with environment variables when building the assets:

- `VITE_APP_TITLE`: The title of the page, defaults to "ServerStatus"
- `VITE_APP_FOOTER_TEXT`: The footer text, defaults to none

### Pre-built Assets

You can find the latest automatically built assets in artifacts of the latest [Actions](https://github.com/JingBh/ServerStatus-theme/actions/workflows/assets.yml) run.

## Development

Set your `ServerStatus-Rust` instance's URL in the `VITE_SERVER_URL` environment variable (`.env` files are supported), then the Vite development server will be configured to proxy requests to your server.
