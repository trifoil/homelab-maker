# homelab-maker

## Prerequisites

- Follow the Tauri platform prerequisites for your OS: https://tauri.app/start/prerequisites/
- Example system packages for Fedora/RHEL:
```sh
sudo dnf install pango-devel cairo-gobject-devel libsoup3-devel webkit2gtk4.1-devel
```
- Ensure you have a compatible Node.js and npm installed.

## Quick start

Run these commands from the repository root:
```sh
cd homelab-maker
npm install
npm run tauri android init
```

## Development

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

