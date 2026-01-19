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

- Auth using Google OAuth2
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

# Building from source
TBD

# Development
## Dependencies
- Bun

## Setup
(To complete)
- Download Pocketbase binary for your OS
- Put it in a new directory named `backend` at the project root
- Run `bun run server` once, create a superuser 
- Create the DB schema (TODO: provide mock data and schema)

Backend: localhost:8090
Frontend: localhost:5173

## Run
`bun run dev`

# Deployment
TBD

TODO: Safe deployment checklist
TODO: Docker deployment container (also dev?)


# Contributing

Please open an issue if you'd like to contribute and we'll make it happen. For now it's a one-person project.

# License

GPL latest version idk which one it is right now
