# The Biscuit Barrel

A whimsical field guide to British biscuits: 26 biscuits with illustrations, descriptions, history, a home-baking recipe, dunkability ratings and a Biscuit of the Day.

It's a static site with no build step. Open `index.html` in a browser, or serve the folder with any static host (e.g. `python3 -m http.server`).

- `biscuits.js`: the biscuit data (facts, history, recipes, illustration specs)
- `art.js`: draws each biscuit as an SVG on a paper doily
- `app.js`: search, filters, sorting, Biscuit of the Day, the dunk test and the detail view
- `styles.css`: styles, with light and dark themes

To add a biscuit, add an entry to `biscuits.js`. It joins the search and the Biscuit of the Day rotation automatically.
