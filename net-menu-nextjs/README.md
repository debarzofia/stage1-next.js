# NET Menu — Next.js Project

This is a Next.js App Router conversion of your uploaded NET Menu HTML. It preserves the existing theme, language selector (Kurdish, Arabic, English), categories, featured foods, orders, popup photo viewer, scroll positioning, and restaurant logo.

## Start on your computer

1. Install Node.js 20 or later.
2. Open this **net-menu-nextjs** folder in VS Code.
3. In a terminal, run:

   ```bash
   npm install
   npm run dev
   ```

4. Open **http://localhost:3000**.

## Add food photos

Put your real food photos in **public/images/**.

For example, this menu code:

```js
{ img: "images/12.jpg", p: 22000, n: { ... }, d: { ... } }
```

uses **public/images/12.jpg**. You must add the matching file; only the logo was embedded in the uploaded HTML. Do not rename a photo without changing its `img` entry. Filenames are case-sensitive on Vercel.

To edit food names, prices, descriptions, categories and image filenames, open **public/menu.js** and search for `var MENU = [`.

To set Facebook, Instagram, map and restaurant phone, edit the `CONTACT` object at the very beginning of **public/menu.js**. Empty contact fields remain disabled as in your original design.

## Deploy on Vercel

1. Upload this folder to GitHub (or import it as a project on Vercel).
2. On Vercel select **Framework Preset: Next.js**.
3. Set **Root Directory** to `net-menu-nextjs` if the repository includes this folder at its top level, or leave it `./` if the repository root contains `package.json`.
4. Deploy. No environment variables or server database are needed.

**Important:** Upload the entire project folder, not `index.html` alone. The site runs at `/` and contains a proper Next.js route, avoiding the static HTML deployment setup problem.

## File structure

```text
net-menu-nextjs/
  app/
    globals.css        Original design styles
    layout.jsx          Page shell and Google Fonts
    page.jsx            Home route /
    not-found.jsx       Unknown routes
  components/
    NetMenu.jsx         Next.js component
  lib/
    menu-markup.js      Original HTML markup
  public/
    menu.js             Menu contents and interactions
    images/
      net-logo.jpg      Extracted restaurant logo
      README.txt        Food image instructions
  package.json
  next.config.mjs
  README.md
```

The interaction script keeps the original vanilla JavaScript to preserve existing behavior exactly; the page, layout, routing, and build are Next.js.
