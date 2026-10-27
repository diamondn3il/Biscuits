# Instagram hero banner

Six posts that together form one big banner across the top two rows of the profile grid.

![How it looks on a profile](profile-mockup.png)

## Which set to post

There are two sets of the same six posts. **Use the square set in `posts-square/`.**

- `posts-square/` (1080 × 1080): works with Instagram's default upload crop, which is square.
  Nothing else to do.
- `posts/` (1080 × 1350 portrait): only lines up if you tap the **expand** button on Instagram's
  crop screen for every post. If it isn't tapped, Instagram crops each post to a square, the
  joins no longer meet, and words go missing ("The E scuit"). `grid-preview.png` shows this
  set as designed.

## Posting order

Instagram puts the newest post top-left, so post them **in number order, 1 to 6**. Post 1 ends
up bottom-right and post 6 top-left:

| Grid position | File in `posts-square/` |
|---|---|
| Top left | `post-6-of-6-row1-col1.png` |
| Top middle | `post-5-of-6-row1-col2.png` |
| Top right | `post-4-of-6-row1-col3.png` |
| Bottom left | `post-3-of-6-row2-col1.png` |
| Bottom middle | `post-2-of-6-row2-col2.png` |
| Bottom right | `post-1-of-6-row2-col3.png` |

Things to know:

- **Post all six in one sitting** so they stay together.
- **Later posts push the banner down a row.** Post in threes to keep it lined up: three new posts
  move it down exactly one row. Pinning posts also changes the order.
- **Leave the crop and the grid thumbnail as they are.** The profile grid shows the middle of each
  post, and the pieces are drawn to join up at that default.
- Each post still looks complete when someone opens it in the feed.
- If the banner is already posted from the portrait set, delete those six and post the square
  set: Instagram can't change the crop of a post after it's up.

## Captions

Each post appears in the feed on its own too, so give each a short caption. A matching set:

1. `…and how long they last in a mug of builder's tea ☕ Dunk ratings, dunk windows and the odd casualty. #DunkTest #BiscuitTin`
2. `…how to bake them at home 🧁 A home-kitchen recipe for every biscuit, in °C, fan and Gas Mark. #HomeBaking #BiscuitTin`
3. `…where they came from 📜 From Georgian Bath to a stand-off with the Daleks. #BiscuitHistory #BiscuitTin`
4. `Link in bio 🍪 Put the kettle on. #BritishBiscuits #BiscuitTin`
5. `An entirely devoted guide to Britain's finest biscuits 🇬🇧 #TeaAndBiscuits #BiscuitTin`
6. `Welcome to The Biscuit Tin 👋 A field guide to British biscuits. #BritishBiscuits #Biscuits #TeaTime #BiscuitTin`

## Changing it

`banner.html` is the whole banner as one page, laid out in grid space (3 × 1012 by 2 × 1350; open
it with `?format=square` for the square layout, which is the same scaled to 0.8).
Keep important things away from the joins at x 1012 and 2024 and y 1350. Then run `node make.mjs`
(it needs Playwright with Chromium) to cut both sets of posts and redraw the previews.
`parts/` holds the three characters, captured from the Reels with transparent backgrounds.
