# Abstract Portal — Frontend

A static two-page site:

- **`index.html`** — About page, branded "Project Developers", with a
  Submit button.
- **`submit.html`** — the actual submission form + WhatsApp button.

This is plain HTML/CSS/JS — no build step, no framework.

## 1. Point it at your backend

Open `script.js` and set this to your deployed backend's URL:

```js
const API_BASE_URL = 'https://your-backend-url.vercel.app';
```

(Deploy the `backend` folder first — see its own README — then copy
the URL it gives you into this line.)

## 2. Set your WhatsApp number

In both `index.html` and `submit.html`, find:

```html
href="https://wa.me/910000000000?text=..."
```

Replace `910000000000` with your WhatsApp number in international
format, no `+` or spaces.

## 3. Run it locally

Any static file server works, for example:

```bash
npx serve .
```

or just open `index.html` directly in a browser (form submissions
will still work as long as `API_BASE_URL` points to a live backend).

## 4. Deploy

Push this folder to its own GitHub repo and import it on
[vercel.com](https://vercel.com) (or Netlify, GitHub Pages, etc.) —
no environment variables or special build settings are needed since
there's no backend code here.

## Files

```
index.html    About page with brand name and a Submit button
submit.html   the form + WhatsApp button
style.css     shared styling for both pages
script.js     submits the form via fetch() to API_BASE_URL
```
