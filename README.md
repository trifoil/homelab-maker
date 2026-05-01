# homelab-maker

## Prerequisites

- Follow the Tauri platform prerequisites for your OS: https://tauri.app/start/prerequisites/
- Example system packages for Fedora/RHEL:
```sh
sudo dnf install pango-devel cairo-gobject-devel libsoup3-devel webkit2gtk4.1-devel
```
- Ensure you have a compatible Node.js and npm installed.

If you're on wayland you might need to add this to "tauri" in package.json due to an issue with wayland:

"tauri": "WEBKIT_DISABLE_DMABUF_RENDERER=1 tauri" 

For my case, I simply had to remove an svg and put it back, without knowing why, it fixes the app.

## Quick start

Run these commands from the repository root:
```sh
cd homelab-maker
npm install
npm run tauri android init
```

## Development

## Window Minimum Size

The Tauri window is configured with a minimum width of 300 and a minimum height of 250. You can change these in `homelab-maker/src-tauri/tauri.conf.json` under the `windows` section.

- Desktop development:
```sh
npm run tauri dev
```

- Android development:
```sh
npm run tauri android dev
```

## Notes
- The system package list above is an example for Fedora-based systems; adapt for your distribution.

## Dependancies
- For reactflow.dev
```sh
npm install @xyflow/react
```