# ProToolNest Privacy

Privacy-focused tools for ProToolNest.

## Structure

- `server.js` — Main site (homepage, login, tool listing)
- `tools/emberlink/` — EmberLink (self-destructing message)
- `tools/keydrop/` — KeyDrop (client-side file encryption)

Each tool runs as its own Node process.

## Run locally

```bash
# Main site
npm install
npm start

# EmberLink (in another terminal)
cd tools/emberlink
npm install
npm start

# KeyDrop (in another terminal)
cd tools/keydrop
npm install
npm start
```
