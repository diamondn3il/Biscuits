# Instagram launch kit

Everything needed to set up The Biscuit Tin on Instagram, plus the first three posts.

## 1. Create the account

Sign up in the Instagram app or at instagram.com with an email address for the project, so
the account isn't tied to a personal one. Then switch it to a **Creator** or **Business**
account (Settings → Account type and tools). That gives you post insights and a contact
button.

## 2. Profile

**Username ideas**, in order of preference. Instagram tells you which are free when you
type them in:

1. `thebiscuittin`
2. `the.biscuit.tin`
3. `thebiscuittin.uk`
4. `biscuittinguide`
5. `thebiscuittinhq`

**Name:** The Biscuit Tin

**Profile picture:** `profile-picture.png`. Instagram crops it to a circle; the tin sits in
the middle, so only sprinkles are lost at the corners.

**Bio** (130 of 150 characters):

```
A whimsical field guide to British biscuits 🍪
History, bake-at-home recipes and dunk tests ☕
A new Biscuit of the Day, every day 👇
```

**Link:** the site's address. Add it under Edit profile → Links.

**Category:** Food & Beverage, or "Website" if you'd rather it read as a guide.

## 3. First three posts

All are 1080 × 1350, Instagram's tallest feed size. Instagram shows the newest post first,
so to have the welcome post sit top-left of the grid, post them in reverse: 3, then 2,
then 1.

### `03-cake-or-biscuit.png`

```
Cake or biscuit? 🤔

In 1991 a VAT tribunal had to decide. McVitie's argued that cakes go hard when they're stale, and biscuits go soft. A stale Jaffa Cake goes hard. They even baked a giant one to make the point.

The verdict: legally a cake. Britain has been arguing about it ever since.

Where do you stand? Tell us in the comments 👇

#JaffaCake #CakeOrBiscuit #BritishBiscuits #Biscuits #TeaTime #BritishFood #McVities #BiscuitTin
```

### `02-biscuit-of-the-day.png`

```
Biscuit of the Day: the Custard Cream 🍪

Two crisp vanilla biscuits, a sweet custard-flavoured cream, and a pattern of ferns and scrolls that has barely changed since around 1908.

Plot twist: there's no actual custard inside. The flavour comes from custard powder and vanilla.

Dunkability: 3 out of 5. Give it about 4 seconds ☕

The full history and a recipe to bake your own are on the site. Link in bio.

#CustardCream #BiscuitOfTheDay #BritishBiscuits #Biscuits #TeaAndBiscuits #Baking #HomeBaking #BiscuitTin
```

### `01-welcome.png`

```
Welcome to The Biscuit Tin 👋☕

A whimsical field guide to Britain's finest biscuits, from the humble Rich Tea to the legally-a-cake Jaffa Cake.

Every biscuit gets its history, a recipe to bake it at home, and an honest verdict on how long it survives a dunk.

Follow along for a Biscuit of the Day, biscuit history and the great debates. First question: chocolate side up or down?

Link in bio 👆

#BritishBiscuits #Biscuits #TeaTime #TeaAndBiscuits #BritishFood #Baking #Digestive #BiscuitTin
```

## 4. Ideas for what to post next

- **Biscuit of the Day:** one of the site's biscuits each day, using the custard cream post as the template.
- **The great debates:** chocolate digestive side up or down, "nice" or "neece", the double-dunk.
- **Dunk tests:** a short Reel of each biscuit going into a mug, with a timer.
- **Bake-alongs:** Reels of the site's recipes, starting with the easy ones (shortbread, ginger nuts, Hobnobs).
- **Stories:** polls ("Bourbon or custard cream?") and quizzes on biscuit history.

## Making more posts

`posts.html` holds the three post designs. Open it in a browser from this folder and each
`<section class="post">` is a 1080 × 1350 post. Copy a section, change the biscuit and the
text, then screenshot the section at full size.

## Reel: Reggie the Rich Tea

`reggie/reggie-the-rich-tea.mp4` is a 16-second vertical Reel (1080 × 1920, 30fps, with sound).
Reggie, a nervous Rich Tea, sets out to prove Rich Teas *can* handle a dunk. He leaps into
a cup of tea, stays in one second too long, and climbs out missing his bottom half. "…I'm
fine. Totally fine."

Post it as a Reel and use `reggie/cover.png` as the cover (Edit cover → Add from camera roll),
so it sits nicely on the grid. The soundtrack is original, so there's no music licensing to
worry about. You can also swap in a trending sound in the Reels editor.

```
Meet Reggie. Reggie is a Rich Tea. Reggie has something to prove 🫖

Rich Teas have a dunk window of about 2 seconds. Reggie went for 3.

He's fine. Totally fine. 🙃

How long do you dunk yours? 👇

#RichTea #DunkTest #BritishBiscuits #TeaAndBiscuits #Biscuits #TeaTime #BritishHumour #BiscuitTin
```

All words sit inside Instagram's safe area: below the header, above the caption and
buttons, left of the like/comment/share column, and inside the 4:5 crop the feed uses. Keep
new text between 320px and 1500px from the top, and left of 940px, so nothing gets hidden.

To change the animation, edit `reggie/reggie.html`: open it in a browser and it plays on a
loop. `reggie/soundtrack.py` synthesises the sound effects and tune, timed to the same
seconds as the animation.

## The whole cast

`characters/` has a character and a Reel for every other biscuit on the site: 25 more, from
Doug the Digestive to Wyatt the Wagon Wheel. `characters/README.md` has a posting order (one a day
for nearly a month, starting with Reggie) and a caption for each.
