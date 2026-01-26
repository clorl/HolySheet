# Holy Sheet - Easy online character sheets for Tabletop RPGs

I'm sick of the complexity of VTTs and hosting character sheets in an easy to edit way online.
What I want : 
- Upload PDF (can be form-fillable)
- Add fields and annotate in the browser
- Everything is saved and can be viewed by the GM live

That's it.

It's meant to be self-hosted but if it gets a little clout, I'll start a Patreon or something to host it online for free-ish if possible.

# Roadmap

[Excalidraw board](https://excalidraw.com/#json=kP9K5FpiHsubBd4gw9wB5,AXBZFkbEwbPaCjh0IEQeqg)

## MVP

- Auth using OAuth2
- Manage your list of character sheets
- Upload PDF
- Supported field types : Text, checkbox, radio
- Add, edit, remove fields (context menu)
- Basic landing page
- Permissions management

## Alpha
TBD

## Other features

- Export edited sheet to PDF, different formats, with or without the data etc
- Rich text support
- Sidebar to list all the fields in the sheet and edit them in a "web friendly" way
- Mouse drawing/annotation support
- Manage sheet pages : Reorder, add, remove, replace
- Add images on top of the sheet
- Add text-only pages for note-taking
- Live edit
- Aggregate parts of multiple sheets for DM (select a region to add to a "dashboard")
- Customization of padding, margins, etc
- Community template collection
- Collapsible sections
- Cool branding
- Documentation

# Tech
Uses pocketbase as a backend, which serves a static CSR svelte app. The svelte app handles routing on the client and lives at dist/pb_public/index.html

Pocketbase behaviour may be customized by adding code to dist/pb_hooks

Dev mode uses Vite to make iteration easier

# Building from source
TBD

# Development
## Dependencies
- Bun
- Pocketbase

## Setup
1. Download Pocketbase binary for your OS
2. Put it in the `dist` directory, named `pocketbase` (.exe)

## Development
1. For now mock data is provided in the repo for easier dev
2. Run `bun run dev:pb` and `bun run dev:svelte` in parallel.
3. You can visit the backend dashboard at `localhost:8090/_` (Admin login:password -> admin@admin.com:AdminAdmin1)
4. Visit the app at `localhost:5173`

## Build
TODO

# Deployment
TBD

TODO: Safe deployment checklist
TODO: Docker deployment container (also dev?)


# Contributing

Please open an issue if you'd like to contribute and we'll make it happen. For now it's a one-person project.

# License

AGPL latest version idk which one it is right now
