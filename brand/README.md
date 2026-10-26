# The Biscuit Tin logo

An open raspberry biscuit tin with a custard polka-dot band, its lid tipped up to show a
Jammie Dodger and a digestive inside. It's drawn in the same chunky chocolate-outline
claymation style as the site.

| File | Use it for |
|------|------------|
| `logo-mark.svg`, `logo-mark-512.png` | The tin on its own, transparent background. Stickers, page headers, anywhere the tin sits on a light background. |
| `logo-badge.svg`, `icon-512.png`, `icon-192.png` | The tin on a sprinkled pink tile with rounded corners. Profile pictures (Instagram, X, Facebook, TikTok, YouTube) and app icons. It stays clear of the edges, so circular crops are safe. |
| `logo-badge-square.svg`, `apple-touch-icon.png` | The same tile with square corners. iOS adds its own rounding. |
| `logo-horizontal.svg`, `logo-horizontal.png` | The tin beside the name, transparent background. Website headers, email signatures, banners. |
| `social-square.svg`, `social-square.png` | 1080 × 1080 post with the tin, name and tagline. Instagram and Facebook posts. |
| `social-card.svg`, `social-card.png` | 1200 × 630 link preview. Used as the site's `og:image` for shared links. |
| `favicon-16.png`, `favicon-32.png`, `favicon-48.png` | Browser tab icons. `../favicon.svg` and `../favicon.ico` are the ones the site links to. |

Colours: chocolate `#3b1f14`, raspberry `#d92f63`, custard `#ffc94a`, cream `#fff6e0`,
strawberry-milk background `#fff0f4`. Fonts: Fredoka Bold (name) and Nunito Bold (tagline).
The lettering in the SVGs is converted to outlines, so they display correctly without the
fonts installed.

## Regenerating

`make_logo.py` draws every SVG from one definition of the tin. It needs `fonttools` and
`brotli`, plus the Fredoka Bold and Nunito Bold font files (download them from Google Fonts):

    python make_logo.py Fredoka-Bold.woff2 Nunito-Bold.woff2 brand/

Render the PNGs from the SVGs with any SVG renderer at the sizes in the table.
