# The Biscuit Tin

A whimsical field guide to British biscuits. Each biscuit has an illustration, a description, its history, a home-baking recipe and a dunkability rating, and one is picked as the Biscuit of the Day.

It's a static site with no build step. Open `index.html` in a browser, or serve the folder with any static host (e.g. `python3 -m http.server`).

- `biscuits.js`: the biscuit data (facts, history, recipes, illustration specs)
- `art.js`: draws each biscuit as an SVG on a paper doily
- `app.js`: search, filters, sorting, Biscuit of the Day, the dunk test and the detail view
- `styles.css`: styles, with light and dark themes

To add a biscuit, add an entry to `biscuits.js`. It joins the search and the Biscuit of the Day rotation automatically.

## Logo

The logo, favicons, app icons and social media images live in `brand/`. See `brand/README.md` for which file to use where.
