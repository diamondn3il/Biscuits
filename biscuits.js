/* The Biscuit Tin — the tin itself.
   Each entry: facts, history, a home-kitchen recipe and an `art` spec that art.js turns into an illustration.
   Oven temperatures are { c, fan, gas }; null means no baking required. */
window.BISCUITS = [
  {
    id: "digestive",
    name: "Digestive",
    aka: "The Plain Digestive, the Wheatmeal",
    category: "Plain & Simple",
    year: 1892,
    yearLabel: "1892",
    origin: "Edinburgh, Scotland",
    maker: "McVitie & Price",
    dunk: 4,
    dunkSecs: 6,
    kcal: 71,
    tags: ["wholemeal", "classic", "everyday", "scottish", "bicarbonate"],
    blurb: "Sandy, wholesome and quietly brilliant. The biscuit the rest of the tin is measured against.",
    description: "A semi-sweet, wholemeal round with a sandy, crumbly bite and a gentle malty flavour. It's sturdy enough for a serious dunk, generous enough to share, and the foundation of every cheesecake base worth eating.",
    history: "Two Scottish doctors developed a digestive biscuit in 1839, believing its bicarbonate of soda would settle the stomach. That claim is where the name comes from, and it has never been proven. The version Britain knows best came in 1892, when Alexander Grant, a young employee at McVitie & Price in Edinburgh, created the recipe that is still the benchmark today.",
    fact: "The digestive's dunking credentials are backed by science: in 1998 physicist Dr Len Fisher used the Washburn equation to work out how tea soaks into a biscuit, with the digestive as one of his test subjects.",
    recipe: {
      makes: "About 16",
      time: "35 minutes",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "175g wholemeal flour",
        "25g fine oatmeal or blitzed porridge oats",
        "1 tsp baking powder",
        "Pinch of salt",
        "100g cold unsalted butter, cubed",
        "50g soft light brown sugar",
        "2–3 tbsp milk"
      ],
      method: [
        "Heat the oven and line two baking trays with baking paper.",
        "Mix the flour, oatmeal, baking powder and salt, then rub in the butter until it looks like breadcrumbs.",
        "Stir in the sugar and add just enough milk to bring everything together into a firm dough.",
        "Roll out to about 3mm thick on a floured surface and cut into 7cm rounds. Prick each one a few times with a fork.",
        "Bake for 12–15 minutes until golden at the edges. Leave on the tray for 5 minutes, then cool on a wire rack."
      ]
    },
    art: { t: "round", fill: "#C98E4A", holes: true, speckle: "#8A5A2B", text: "DIGESTIVE", rim: true }
  },
  {
    id: "chocolate-digestive",
    name: "Chocolate Digestive",
    aka: "The Choccy Dig",
    category: "Chocolate",
    year: 1925,
    yearLabel: "1925",
    origin: "Edinburgh, Scotland",
    maker: "McVitie & Price",
    dunk: 4,
    dunkSecs: 5,
    kcal: 84,
    tags: ["milk chocolate", "dark chocolate", "classic", "favourite"],
    blurb: "A digestive in its Sunday best. Regularly voted the nation's favourite biscuit.",
    description: "The trusty digestive with a layer of milk or dark chocolate on one side. Dunk it chocolate-side down and count to five: the chocolate turns glossy and molten while the biscuit holds its nerve.",
    history: "McVitie's first coated its digestive in chocolate in 1925, selling it at first as the Chocolate Homewheat. Milk chocolate came first, with plain (dark) chocolate following later. It has topped polls of Britain's favourite biscuit more times than anyone can count.",
    fact: "Is the chocolate on the top or the bottom? Biscuit makers enrobe the underside, so technically the chocolate is the bottom. Most people still eat it chocolate-side up.",
    recipe: {
      makes: "About 16",
      time: "50 minutes, plus setting",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "1 batch digestive dough (see the Digestive recipe)",
        "150g milk or dark chocolate, chopped",
        "1 tsp sunflower oil (optional, for extra gloss)"
      ],
      method: [
        "Make, cut and bake the digestives as for the plain version, then let them cool completely.",
        "Melt the chocolate in a heatproof bowl over barely simmering water, stirring in the oil if using.",
        "Spread a thin layer of chocolate over the flat side of each biscuit.",
        "When the chocolate starts to thicken, drag a fork across it in gentle waves for the classic finish.",
        "Leave to set at cool room temperature for about an hour."
      ]
    },
    art: { t: "round", fill: "#C98E4A", choc: "#4A2C1D" }
  },
  {
    id: "rich-tea",
    name: "Rich Tea",
    aka: "The Dunker's Dare",
    category: "Plain & Simple",
    year: 1700,
    yearLabel: "17th century",
    origin: "Yorkshire, England",
    maker: "Many bakers; McVitie's is best known",
    dunk: 2,
    dunkSecs: 2,
    kcal: 38,
    tags: ["light", "thin", "plain", "yorkshire", "low calorie"],
    blurb: "Thin, pale and polite. Dunk it with lightning reflexes or lose it to the mug.",
    description: "A thin, crisp, lightly sweet biscuit with a subtle malty flavour. It is modest on its own and transformed by tea. It soaks up liquid faster than almost anything else in the tin, so the dunk must be swift and decisive.",
    history: "The Rich Tea is generally traced to 17th-century Yorkshire, where it was baked as a light snack for the upper classes to nibble between meals. The 'rich' was relative: it had more sugar and fat than the hard ship's biscuits of the day. It became a mass-market staple in the 20th century and is still one of the best-selling biscuits in Britain.",
    fact: "Fans of the 'double dunk' hold two Rich Teas together for extra structural support. It's not cheating. It's engineering.",
    recipe: {
      makes: "About 24",
      time: "30 minutes",
      oven: { c: 200, fan: 180, gas: 6 },
      ingredients: [
        "225g plain flour",
        "1 tsp baking powder",
        "50g unsalted butter, cubed",
        "50g caster sugar",
        "1 tbsp golden syrup",
        "4–5 tbsp milk"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Rub the butter into the flour and baking powder, then stir in the sugar.",
        "Warm the syrup with the milk and mix it in to make a stiff, smooth dough.",
        "Roll out very thinly, about 2mm, and cut into 6cm rounds. Prick all over with a fork.",
        "Bake for 8–10 minutes until just pale gold. They crisp up as they cool."
      ]
    },
    art: { t: "round", fill: "#E3B878", holes: true, text: "RICH TEA", rim: true, r: 68 }
  },
  {
    id: "hobnob",
    name: "Hobnob",
    aka: "The Oaty One",
    category: "Plain & Simple",
    year: 1985,
    yearLabel: "1985",
    origin: "Harlesden, London",
    maker: "McVitie's",
    dunk: 5,
    dunkSecs: 8,
    kcal: 67,
    tags: ["oats", "rustic", "crunchy", "golden syrup", "strong dunker"],
    blurb: "Rough, oaty and built like a tank. The heavyweight champion of the dunk.",
    description: "A rugged, rustic biscuit made with rolled oats and golden syrup. It's crunchy, nutty and faintly caramel, with a craggy surface that soaks up tea without falling apart. The milk-chocolate-topped version is a national treasure in its own right.",
    history: "McVitie's launched the Hobnob in 1985, and a chocolate version followed in 1987. The name plays on the oven 'hob' and the old phrase 'to hobnob', meaning to mingle with the great and good. It quickly gained a reputation as the most robust dunker in the cupboard.",
    fact: "Hobnobs are often named the hardest biscuit to break in a dunk. Their oats act like rebar in concrete.",
    recipe: {
      makes: "About 18",
      time: "30 minutes",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "100g self-raising flour",
        "100g porridge oats",
        "100g caster or demerara sugar",
        "100g unsalted butter",
        "1 tbsp golden syrup",
        "½ tsp bicarbonate of soda",
        "1 tbsp boiling water"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Mix the flour, oats and sugar in a large bowl.",
        "Melt the butter and syrup together. Dissolve the bicarbonate in the boiling water and stir it into the butter. It will foam.",
        "Pour into the dry ingredients and mix well. Roll into walnut-sized balls and flatten slightly, leaving room to spread.",
        "Bake for 12–15 minutes until deep golden. Cool on the tray; they firm up as they cool."
      ]
    },
    art: { t: "round", fill: "#C58A45", oats: true, rough: true }
  },
  {
    id: "custard-cream",
    name: "Custard Cream",
    aka: "The Baroque Beauty",
    category: "Cream Sandwiches",
    year: 1908,
    yearLabel: "c. 1908",
    origin: "England",
    maker: "Many bakers; Crawford's and Peek Freans among the earliest",
    dunk: 3,
    dunkSecs: 4,
    kcal: 57,
    tags: ["vanilla", "sandwich", "filling", "ornate", "pattern"],
    blurb: "Two ornate vanilla biscuits hugging a sweet custard-flavoured cream. Elegant and slightly smug about it.",
    description: "A rectangular sandwich of two crisp vanilla biscuits embossed with Victorian-style ferns and scrolls, holding a sweet, custard-flavoured buttercream. Twist it apart, lick the cream, eat the biscuits: there is no wrong way.",
    history: "Custard creams appeared around 1908, and the ornate pattern on top is said to echo Victorian decorative design. Despite the name, there's no actual custard inside. The flavour comes from custard powder and vanilla. It is a fixture of office biscuit tins and frequently tops polls of the nation's favourites.",
    fact: "The custard cream's pattern has barely changed in over a century. The ferns and scrolls are thought to be a nod to the Victorian fashion for fern collecting.",
    recipe: {
      makes: "About 16 sandwiches",
      time: "45 minutes",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "225g plain flour",
        "50g custard powder",
        "175g soft unsalted butter",
        "75g icing sugar",
        "1 egg yolk",
        "1 tsp vanilla extract",
        "For the filling: 100g soft butter, 200g icing sugar, 2 tbsp custard powder, ½ tsp vanilla, 1 tsp milk"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Beat the butter and icing sugar until pale, then beat in the egg yolk and vanilla.",
        "Sift in the flour and custard powder and mix to a soft dough. Chill for 20 minutes.",
        "Roll out to 4mm and cut into 6 × 4cm rectangles. Press a pattern on top with a fork or a stamp if you have one.",
        "Bake for 10–12 minutes until just firm and barely coloured. Cool completely.",
        "Beat the filling ingredients together until fluffy and sandwich the biscuits in pairs."
      ]
    },
    art: { t: "rect", fill: "#F0C77A", cream: "#FFF3D6", ornate: true, w: 150, h: 92 }
  },
  {
    id: "bourbon",
    name: "Bourbon",
    aka: "The Creola",
    category: "Cream Sandwiches",
    year: 1910,
    yearLabel: "1910",
    origin: "Bermondsey, London",
    maker: "Peek Frean",
    dunk: 3,
    dunkSecs: 4,
    kcal: 67,
    tags: ["chocolate", "cocoa", "sandwich", "sugar", "french"],
    blurb: "Dark, sugar-sprinkled and faintly aristocratic. Named after French royalty, not whiskey.",
    description: "Two oblong cocoa biscuits, scattered with crunchy sugar and pricked with neat holes, sandwiching a rich chocolate buttercream. It's chocolatey without being fussy, and its fans are fiercely loyal.",
    history: "Peek Frean of Bermondsey launched this biscuit in 1910 under the name 'Creola'. It was renamed in the 1930s after the House of Bourbon, the French royal family. It has nothing whatsoever to do with American whiskey.",
    fact: "Count the holes: there are usually ten on each side. They let steam escape during baking so the biscuits stay flat.",
    recipe: {
      makes: "About 14 sandwiches",
      time: "45 minutes",
      oven: { c: 170, fan: 150, gas: 3 },
      ingredients: [
        "100g plain flour",
        "15g cocoa powder",
        "½ tsp bicarbonate of soda",
        "50g soft unsalted butter",
        "50g dark brown sugar",
        "1 tbsp golden syrup",
        "Granulated sugar, for sprinkling",
        "For the filling: 50g soft butter, 100g icing sugar, 1 tbsp cocoa, 1 tsp instant coffee dissolved in 1 tsp hot water"
      ],
      method: [
        "Heat the oven and line a baking tray.",
        "Cream the butter, sugar and syrup, then sift in the flour, cocoa and bicarbonate and knead to a dough.",
        "Roll out to 4mm and cut into neat 7 × 3cm rectangles. Sprinkle half with granulated sugar and prick them all with a skewer.",
        "Bake for 12–15 minutes. They'll still feel a little soft, so let them cool on the tray.",
        "Beat the filling until smooth and sandwich a sugared biscuit to a plain one."
      ]
    },
    art: { t: "rect", fill: "#5A3420", cream: "#8B5A3C", holes: true, text: "BOURBON", sugar: true, w: 156, h: 72 }
  },
  {
    id: "jammie-dodger",
    name: "Jammie Dodger",
    aka: "The Heart Window",
    category: "Jam & Fruit",
    year: 1960,
    yearLabel: "1960s",
    origin: "Llantarnam, Wales",
    maker: "Burton's Biscuits",
    dunk: 1,
    dunkSecs: 1,
    kcal: 83,
    tags: ["jam", "raspberry", "heart", "sandwich", "welsh", "doctor who"],
    blurb: "Shortcake with a jammy heart. Not for dunking. Absolutely for nibbling round the edges.",
    description: "Two golden shortcake rounds, the top one with a heart-shaped window, sandwiching a glossy layer of sticky jam. It's chewy, crumbly and sweet, and best eaten edge-first to save the jammy middle for last.",
    history: "Burton's launched the Jammie Dodger in the 1960s and still bakes it in Llantarnam, South Wales. The name is often said to be a nod to Roger the Dodger from The Beano. The filling is traditionally a raspberry-flavoured plum jam.",
    fact: "In the 2010 Doctor Who episode 'Victory of the Daleks', the Doctor bluffs a fleet of Daleks by brandishing a Jammie Dodger as a self-destruct button.",
    recipe: {
      makes: "About 12",
      time: "45 minutes",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "225g plain flour",
        "100g caster sugar",
        "150g cold unsalted butter, cubed",
        "1 egg yolk",
        "1 tsp vanilla extract",
        "6 tbsp seedless raspberry jam",
        "Icing sugar, for dusting"
      ],
      method: [
        "Rub the butter into the flour, stir in the sugar, then add the yolk and vanilla and bring together into a dough. Chill for 30 minutes.",
        "Heat the oven. Roll the dough out to 4mm and cut 24 rounds with a fluted 6cm cutter.",
        "Cut a small heart from the centre of half the rounds.",
        "Bake for 10–12 minutes until pale golden, then cool completely.",
        "Spread jam on the whole rounds, dust the heart tops with icing sugar and press them on. A little extra jam in each window makes them shine."
      ]
    },
    art: { t: "dodger", fill: "#E2A85B" }
  },
  {
    id: "ginger-nut",
    name: "Ginger Nut",
    aka: "The Ginger Snap",
    category: "Ginger & Spice",
    year: 1850,
    yearLabel: "19th century",
    origin: "Britain",
    maker: "Many bakers; McVitie's is best known",
    dunk: 5,
    dunkSecs: 10,
    kcal: 46,
    tags: ["ginger", "spice", "hard", "crunchy", "golden syrup", "strong dunker"],
    blurb: "Fiery, cracked and tough as old boots. Dunking is not optional, it's required.",
    description: "A small, dark, crackle-topped biscuit with a warm ginger heat and a famously hard snap. Straight from the packet it can test your fillings; after a good ten-second dunk it turns gloriously chewy.",
    history: "Spiced ginger biscuits have been baked in Britain since medieval gingerbread was sold at fairs. Small round 'nuts' became popular in the 19th century as treacle and golden syrup became cheap. They were sold by countless bakers before the biscuit factories made them a national staple.",
    fact: "Ginger nuts hold out in hot tea far longer than most biscuits, so they're a favourite of the long, contemplative dunk.",
    recipe: {
      makes: "About 20",
      time: "25 minutes",
      oven: { c: 190, fan: 170, gas: 5 },
      ingredients: [
        "100g self-raising flour",
        "2 tsp ground ginger",
        "½ tsp bicarbonate of soda",
        "50g unsalted butter",
        "40g caster sugar",
        "2 tbsp golden syrup"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Sift the flour, ginger and bicarbonate into a bowl and rub in the butter. Stir in the sugar.",
        "Warm the syrup until runny and mix it in to form a firm dough.",
        "Roll into small balls, place well apart and flatten slightly.",
        "Bake for 10–12 minutes until cracked and deep brown. Cool on a rack to harden."
      ]
    },
    art: { t: "round", fill: "#9C5A2A", cracks: 7, r: 62 }
  },
  {
    id: "shortbread",
    name: "Shortbread",
    aka: "Petticoat Tails",
    category: "Buttery & Short",
    year: 1550,
    yearLabel: "16th century",
    origin: "Scotland",
    maker: "Scottish home bakers",
    dunk: 3,
    dunkSecs: 3,
    kcal: 100,
    tags: ["butter", "scottish", "hogmanay", "christmas", "crumbly", "petticoat"],
    blurb: "Three ingredients, centuries of pride. Pure butter, pure Scotland.",
    description: "A pale, crumbly, melt-in-the-mouth biscuit of just butter, sugar and flour. It's baked low and slow, so it stays sandy-white rather than brown. Made in fingers, rounds, or a large round cut into 'petticoat tails'.",
    history: "Shortbread grew out of medieval 'biscuit bread', leftover bread dough dried in a cooling oven. Over time the yeast was replaced with butter. The 'short' refers to its crumbly texture, which comes from all that fat. Mary, Queen of Scots, is said to have loved petticoat tails in the 16th century, and shortbread is still part of Hogmanay celebrations.",
    fact: "The classic proportions are 1 part sugar, 2 parts butter and 3 parts flour by weight. Easy to remember, even after a dram.",
    recipe: {
      makes: "8 petticoat tails",
      time: "50 minutes",
      oven: { c: 160, fan: 140, gas: 3 },
      ingredients: [
        "125g soft salted butter",
        "55g caster sugar, plus extra for sprinkling",
        "180g plain flour (or 150g plain + 30g rice flour for extra snap)"
      ],
      method: [
        "Heat the oven and lightly butter a 20cm round tin.",
        "Beat the butter and sugar until smooth, then work in the flour until it just comes together.",
        "Press evenly into the tin, crimp the edge with your fingers and prick all over with a fork. Score into 8 wedges.",
        "Bake for 30–35 minutes until firm and only just golden at the edges.",
        "Sprinkle with sugar, recut along the scores while warm and leave to cool in the tin."
      ]
    },
    art: { t: "round", fill: "#F0D49A", fluted: { n: 28, a: 3 }, segments: 8, holes: "ring", sugar: true }
  },
  {
    id: "garibaldi",
    name: "Garibaldi",
    aka: "The Squashed Fly",
    category: "Jam & Fruit",
    year: 1861,
    yearLabel: "1861",
    origin: "Bermondsey, London",
    maker: "Peek Frean",
    dunk: 3,
    dunkSecs: 4,
    kcal: 40,
    tags: ["currants", "fruit", "squashed fly", "glazed", "italian"],
    blurb: "Glossy, chewy and packed with currants. Affectionately known as the squashed fly biscuit.",
    description: "Two thin layers of soft biscuit pressed around a layer of currants, glazed until glossy and baked in long strips. It's chewy, fruity and not too sweet. Sold in strips you snap apart, which is half the fun.",
    history: "Created in 1861 by John Carr at Peek Frean in Bermondsey, the Garibaldi is named after Giuseppe Garibaldi, the Italian general. He had been hugely popular with the British public since visiting Tyneside in 1854. Generations of schoolchildren have renamed it the 'squashed fly biscuit'.",
    fact: "Garibaldis are one of the few biscuits that improve after a day or two, as the currants soften the dough around them.",
    recipe: {
      makes: "About 20",
      time: "40 minutes",
      oven: { c: 190, fan: 170, gas: 5 },
      ingredients: [
        "175g self-raising flour",
        "Pinch of salt",
        "50g cold unsalted butter, cubed",
        "50g caster sugar",
        "4 tbsp milk",
        "100g currants",
        "1 egg, beaten, for glazing"
      ],
      method: [
        "Heat the oven and line a baking tray.",
        "Rub the butter into the flour and salt, stir in the sugar, then add the milk to make a soft dough.",
        "Roll into a thin rectangle, about 20 × 30cm, and cut it in half.",
        "Scatter the currants over one half, lay the other on top and roll firmly so the currants show through.",
        "Brush with egg and cut into 3 × 7cm strips without separating them fully.",
        "Bake for 12–15 minutes until golden and shiny. Snap apart once cool."
      ]
    },
    art: { t: "rect", fill: "#D99A55", currants: true, glossy: true, w: 160, h: 72, rx: 6 }
  },
  {
    id: "jaffa-cake",
    name: "Jaffa Cake",
    aka: "Legally a Cake",
    category: "Teatime Treats",
    year: 1927,
    yearLabel: "1927",
    origin: "Stockport, England",
    maker: "McVitie & Price",
    dunk: 2,
    dunkSecs: 2,
    kcal: 46,
    tags: ["orange", "sponge", "jelly", "chocolate", "cake or biscuit", "vat"],
    blurb: "Sponge, orange jelly and dark chocolate. Lives in the biscuit aisle. Is, officially, a cake.",
    description: "A soft Genoise sponge base topped with a disc of tangy orange jelly and a thin layer of dark chocolate. Some nibble the edges first, then the chocolate, then the jelly 'moon'. Others simply eat three in a row.",
    history: "McVitie and Price introduced Jaffa Cakes in 1927, naming them after Jaffa oranges. In 1991 a VAT tribunal had to decide whether they were cakes (no VAT) or chocolate-covered biscuits (VAT payable). McVitie's argued that cakes go hard when stale while biscuits go soft, and a Jaffa Cake goes hard. It even baked a giant Jaffa Cake to make the point. The tribunal agreed: it's a cake.",
    fact: "The Jaffa Cake's legal status as a cake has saved its fans a fortune in VAT, and given Britain one of its most enjoyable arguments.",
    recipe: {
      makes: "12",
      time: "1 hour, plus setting",
      oven: { c: 200, fan: 180, gas: 6 },
      ingredients: [
        "1 × 135g pack orange jelly",
        "150ml boiling water",
        "Finely grated zest of 1 orange",
        "2 large eggs",
        "50g caster sugar",
        "50g self-raising flour",
        "150g dark chocolate"
      ],
      method: [
        "Dissolve the jelly in the boiling water, add the zest and pour into a lined 20cm square tin to a depth of about 1cm. Chill until set.",
        "Heat the oven and grease a 12-hole shallow bun tin.",
        "Whisk the eggs and sugar until thick enough to leave a trail, then gently fold in the flour.",
        "Spoon a little batter into each hole and bake for 8–10 minutes until springy. Cool.",
        "Cut jelly discs slightly smaller than the sponges and place one on each.",
        "Melt the chocolate, spoon it over the jelly to the edges, and criss-cross with a fork as it sets."
      ]
    },
    art: { t: "jaffa" }
  },
  {
    id: "party-ring",
    name: "Party Ring",
    aka: "The Birthday Biscuit",
    category: "Teatime Treats",
    year: 1985,
    yearLabel: "1980s",
    origin: "Batley, West Yorkshire",
    maker: "Fox's Biscuits",
    dunk: 1,
    dunkSecs: 1,
    kcal: 30,
    tags: ["icing", "colourful", "children", "party", "feathered", "yorkshire"],
    blurb: "A small crunchy ring wearing a feathered icing jumper. Compulsory at every children's party.",
    description: "A thin, crisp biscuit ring topped with brightly coloured hard icing, feathered with stripes of a contrasting colour. It's crunchy and sugary and mostly about the colours, which is exactly the point.",
    history: "Fox's Biscuits of Batley in West Yorkshire made the Party Ring a staple of British birthday parties from the 1980s. They became so tied to childhood nostalgia that a short-lived discontinuation in 2006 caused genuine dismay before they returned.",
    fact: "No two Party Rings are quite alike. The feathered pattern is made by dragging lines through wet icing, so every one is slightly different.",
    recipe: {
      makes: "About 20",
      time: "1 hour",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "150g plain flour",
        "50g caster sugar",
        "100g cold unsalted butter, cubed",
        "1 egg yolk",
        "300g icing sugar",
        "3–4 tbsp water",
        "2 or 3 food colourings (pink, yellow and purple are traditional)"
      ],
      method: [
        "Rub the butter into the flour, stir in the sugar and yolk, and bring into a dough. Chill for 20 minutes.",
        "Heat the oven. Roll to 3mm, cut 6cm rounds and cut a 2cm hole from each centre.",
        "Bake for 8–10 minutes until just firm, then cool completely.",
        "Mix the icing sugar with water until thick but spreadable. Divide and colour.",
        "Ice each ring with one colour, pipe thin lines of another on top, then drag a cocktail stick through to feather. Leave to set hard."
      ]
    },
    art: { t: "ring", base: "#F1D4A0", icing: "#F48FB1", feather: "#FFF176" }
  },
  {
    id: "pink-wafer",
    name: "Pink Wafer",
    aka: "The Wafer Thin",
    category: "Cream Sandwiches",
    year: 1920,
    yearLabel: "20th century",
    origin: "Britain",
    maker: "Many bakers; Tunnock's, Crawford's and others",
    dunk: 1,
    dunkSecs: 1,
    kcal: 38,
    tags: ["wafer", "pink", "cream", "strawberry", "raspberry", "light", "variety pack"],
    blurb: "Feather-light layers of pink wafer and cream. The first to vanish from the selection box.",
    description: "Delicate layers of crisp, honeycombed wafer sandwiched with a sweet, faintly fruity pink cream. It's almost weightless, so you can eat several without noticing. Never dunk one: it will dissolve before your eyes.",
    history: "Wafers go back to medieval wafer irons, which pressed batter into thin, patterned sheets. Layered cream wafers became a mass-produced favourite in Britain in the 20th century, and the pink wafer became a fixture of variety packs and party plates. Nobody quite agrees on what flavour the pink is meant to be.",
    fact: "The waffle grid on a wafer isn't just decoration. It stiffens the thin sheets so they snap cleanly instead of bending.",
    recipe: {
      makes: "About 16 fingers",
      time: "20 minutes, plus chilling",
      oven: null,
      ingredients: [
        "8 plain wafer sheets (ice-cream wafer sheets work well)",
        "100g very soft unsalted butter",
        "200g icing sugar",
        "1 tsp milk",
        "½ tsp raspberry or strawberry flavouring",
        "A drop of pink food colouring"
      ],
      method: [
        "Beat the butter, icing sugar, milk and flavouring until very light and fluffy, then tint it pale pink.",
        "Spread a thin layer of cream over a wafer sheet and top with another. Repeat to make a stack of four sheets.",
        "Make a second stack with the remaining sheets.",
        "Wrap and chill for 30 minutes until firm.",
        "Trim the edges and cut into fingers with a sharp serrated knife."
      ]
    },
    art: { t: "wafer" }
  },
  {
    id: "nice",
    name: "Nice",
    aka: "Niece (if you're posh)",
    category: "Plain & Simple",
    year: 1900,
    yearLabel: "Early 1900s",
    origin: "Reading, England",
    maker: "Usually credited to Huntley & Palmers",
    dunk: 3,
    dunkSecs: 3,
    kcal: 40,
    tags: ["coconut", "sugar", "crisp", "pronunciation", "french"],
    blurb: "A crisp coconut biscuit with sugar on top and a pronunciation argument built in.",
    description: "A rectangular, crimp-edged biscuit flavoured with coconut and scattered with crunchy sugar, with its name stamped proudly on top. It's light and crisp, with a toasty coconut sweetness that pairs beautifully with milky tea.",
    history: "The Nice is usually credited to Huntley & Palmers of Reading in the early 20th century. It is thought to be named after the French resort of Nice, which would make it 'neece'. Plenty of people say 'nice' as in pleasant. Both camps are equally certain they're right.",
    fact: "Say 'neece' at a biscuit tin and you'll be called pretentious; say 'nice' and you'll be told it's a place in France. You cannot win.",
    recipe: {
      makes: "About 20",
      time: "35 minutes",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "225g plain flour",
        "1 tsp baking powder",
        "100g cold unsalted butter, cubed",
        "75g caster sugar",
        "40g desiccated coconut",
        "1 egg, beaten",
        "1–2 tbsp milk",
        "Granulated sugar, for sprinkling"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Rub the butter into the flour and baking powder, then stir in the sugar and coconut.",
        "Add the egg and enough milk to make a firm dough.",
        "Roll out to 4mm and cut into 6 × 4cm rectangles, ideally with a crinkle-edged cutter. Prick with a fork and sprinkle with sugar.",
        "Bake for 10–12 minutes until pale golden."
      ]
    },
    art: { t: "rect", fill: "#E8C080", scallop: true, text: "NICE", sugar: true, holes: true, w: 150, h: 100 }
  },
  {
    id: "malted-milk",
    name: "Malted Milk",
    aka: "The Cow Biscuit",
    category: "Plain & Simple",
    year: 1924,
    yearLabel: "1924",
    origin: "Uttoxeter, Staffordshire",
    maker: "Elkes Biscuits",
    dunk: 3,
    dunkSecs: 4,
    kcal: 40,
    tags: ["malt", "milk", "cow", "picture", "staffordshire", "nostalgic"],
    blurb: "A gentle malty biscuit with cows on it. Simple, comforting and a little bit bucolic.",
    description: "A crisp, rectangular biscuit with a soft malted milk flavour and a crinkled edge, embossed with a picture of a cow (or two). It's mild and comforting, just the thing for a late-night cup of tea.",
    history: "Elkes Biscuits of Uttoxeter, Staffordshire, first baked Malted Milks in 1924. The pastoral cow design advertised the milk in the recipe. Malted milk drinks were very fashionable at the time, sold as wholesome and fortifying.",
    fact: "Fans debate what the cows are doing: standing, lying down, or quietly judging your dunking technique.",
    recipe: {
      makes: "About 20",
      time: "35 minutes",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "175g plain flour",
        "50g malted milk powder (such as Horlicks)",
        "½ tsp baking powder",
        "100g soft unsalted butter",
        "50g caster sugar",
        "1 egg yolk",
        "2 tbsp milk"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Cream the butter and sugar, then beat in the yolk.",
        "Mix in the flour, malted milk powder and baking powder, adding milk to make a firm dough.",
        "Roll out to 4mm and cut into rectangles. Press a design on top with a stamp or the back of a fork. A cow is optional but encouraged.",
        "Bake for 10–12 minutes until pale golden."
      ]
    },
    art: { t: "rect", fill: "#E9C58E", scallop: true, cow: true, w: 150, h: 104 }
  },
  {
    id: "fig-roll",
    name: "Fig Roll",
    aka: "The Fig Newton's Cousin",
    category: "Jam & Fruit",
    year: 1900,
    yearLabel: "c. 1900",
    origin: "Britain and Ireland",
    maker: "Jacob's is best known",
    dunk: 3,
    dunkSecs: 5,
    kcal: 70,
    tags: ["figs", "fruit", "pastry", "chewy", "jacob's"],
    blurb: "Soft, cakey pastry wrapped round a sticky fig filling. Your gran's favourite, and rightly so.",
    description: "A soft, golden pastry tube wrapped around a dense, jammy fig paste studded with tiny crunchy seeds. It's chewy, fruity and satisfying, more like a miniature pudding than a biscuit.",
    history: "Fig rolls took off at the end of the 19th century, when new machines made it possible to wrap pastry around a continuous ribbon of filling. The American Fig Newton dates from 1891. Jacob's has made fig rolls in Britain and Ireland for over a century, and its adverts famously teased the nation about how the figs get inside.",
    fact: "How do they get the figs into the fig rolls? The filling and pastry are pushed out together through a special nozzle, a bit like toothpaste with a jacket on.",
    recipe: {
      makes: "About 16",
      time: "1 hour 15 minutes",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "250g dried figs, stalks removed",
        "100ml orange juice or water",
        "1 tbsp honey",
        "Zest of ½ orange",
        "225g plain flour",
        "1 tsp baking powder",
        "100g soft unsalted butter",
        "75g light brown sugar",
        "1 egg, plus 1 tbsp milk"
      ],
      method: [
        "Simmer the figs with the juice, honey and zest for 10 minutes, then blend to a thick paste and cool.",
        "Cream the butter and sugar, beat in the egg and milk, then mix in the flour and baking powder. Chill for 30 minutes.",
        "Heat the oven. Roll the pastry into a long rectangle about 10cm wide and pipe or spoon a line of fig paste down the middle.",
        "Fold the pastry over to enclose the filling, seam side down, and press gently.",
        "Cut into 5cm lengths and bake for 18–20 minutes until golden. Store in a tin overnight to soften."
      ]
    },
    art: { t: "figroll" }
  },
  {
    id: "viennese-whirl",
    name: "Viennese Whirl",
    aka: "The Melting Moment",
    category: "Buttery & Short",
    year: 1950,
    yearLabel: "20th century",
    origin: "Britain (despite the name)",
    maker: "Home bakers, Fox's, Mr Kipling and others",
    dunk: 2,
    dunkSecs: 2,
    kcal: 130,
    tags: ["butter", "piped", "jam", "buttercream", "sandwich", "melt in the mouth"],
    blurb: "Two piped, buttery swirls with jam and buttercream between. Austrian in name, British at heart.",
    description: "Delicate, melt-in-the-mouth butter biscuits piped into rosettes and sandwiched with raspberry jam and vanilla buttercream. They're rich, crumbly and a staple of village fêtes and afternoon teas.",
    history: "The name nods to Viennese baking and its piped butter biscuits, but the jam-and-cream sandwich is a British creation. It became a teatime classic in the 20th century, sold by high-street bakers and boxed by brands such as Fox's and Mr Kipling.",
    fact: "Cornflour is the secret to the whirl's famous melt: it softens the flour so the biscuits dissolve on the tongue.",
    recipe: {
      makes: "About 12 sandwiches",
      time: "50 minutes",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "200g very soft unsalted butter",
        "50g icing sugar",
        "1 tsp vanilla extract",
        "200g plain flour",
        "2 tbsp cornflour",
        "For the filling: 75g soft butter, 150g icing sugar, ½ tsp vanilla, 4 tbsp raspberry jam"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Beat the butter, icing sugar and vanilla until very pale and fluffy, then fold in the flour and cornflour.",
        "Spoon into a piping bag with a large star nozzle and pipe 5cm swirls onto the trays.",
        "Chill for 15 minutes so they keep their shape, then bake for 12–15 minutes until pale golden. Cool completely.",
        "Beat the filling butter, icing sugar and vanilla. Spread jam on half the whirls, buttercream on the rest, and sandwich together."
      ]
    },
    art: { t: "whirl" }
  },
  {
    id: "tunnocks-teacake",
    name: "Tunnock's Teacake",
    aka: "The Wee Dome",
    category: "Chocolate",
    year: 1956,
    yearLabel: "1956",
    origin: "Uddingston, Scotland",
    maker: "Tunnock's",
    dunk: 1,
    dunkSecs: 0,
    kcal: 106,
    tags: ["marshmallow", "chocolate", "foil", "scottish", "dome", "commonwealth games"],
    blurb: "A shortbread base, a cloud of marshmallow and a shell of milk chocolate, wrapped in red and silver foil.",
    description: "A small shortcake disc topped with a dome of light, whipped marshmallow, all sealed in a thin shell of milk chocolate and wrapped in its unmistakable red-and-silver foil. Tap the shell, crack it, and enjoy the mess.",
    history: "Boyd Tunnock created the teacake in 1956 at the family bakery in Uddingston, near Glasgow, which still makes millions every week. It is a much-loved Scottish icon. Giant dancing teacakes even appeared in the opening ceremony of the 2014 Commonwealth Games in Glasgow.",
    fact: "There's no tea in a teacake. It's simply a cake for having with your tea, which is the best kind of reason.",
    recipe: {
      makes: "8",
      time: "1 hour 30 minutes, plus setting",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "100g plain flour",
        "25g caster sugar",
        "50g cold unsalted butter",
        "1 tbsp milk",
        "300g milk chocolate",
        "2 egg whites",
        "100g caster sugar (for the marshmallow)",
        "1 tbsp golden syrup",
        "½ tsp vanilla extract"
      ],
      method: [
        "Rub the butter into the flour and sugar, add the milk and roll out to 4mm. Cut 6cm rounds and bake for 10–12 minutes. Cool.",
        "Melt the chocolate. Brush a thin layer inside 8 half-sphere moulds (6–7cm) and chill. Repeat for a second coat.",
        "Whisk the egg whites, sugar and syrup in a bowl over simmering water for about 6 minutes, until thick and glossy. Remove from the heat, add the vanilla and whisk until cool.",
        "Pipe marshmallow into each chocolate shell, leaving a little room, then press a biscuit on top.",
        "Seal the base with a little more melted chocolate, chill until firm, then carefully pop out of the moulds."
      ]
    },
    art: { t: "teacake" }
  },
  {
    id: "penguin",
    name: "Penguin",
    aka: "P-p-p-pick up a Penguin",
    category: "Chocolate",
    year: 1932,
    yearLabel: "1932",
    origin: "Glasgow, Scotland",
    maker: "William McDonald; now McVitie's",
    dunk: 3,
    dunkSecs: 3,
    kcal: 120,
    tags: ["chocolate", "bar", "lunchbox", "jokes", "wrapper", "scottish"],
    blurb: "A chocolate-coated chocolate sandwich bar with a joke on the wrapper. Lunchbox royalty.",
    description: "Two chocolate biscuits sandwiched with chocolate cream and covered all over in milk chocolate, sold individually wrapped. It's chocolate on chocolate on chocolate, and the wrapper jokes are a tradition.",
    history: "Glasgow biscuit maker William McDonald launched the Penguin in 1932, reportedly naming it after the penguins he admired on a trip to the zoo. It became a lunchbox legend, helped by the TV slogan 'P-p-p-pick up a Penguin' and the riddles printed on every wrapper.",
    fact: "Why don't penguins fly? They can't afford the plane tickets. (We did warn you about the wrapper jokes.)",
    recipe: {
      makes: "10 bars",
      time: "1 hour, plus setting",
      oven: { c: 170, fan: 150, gas: 3 },
      ingredients: [
        "1 batch Bourbon biscuit dough (see the Bourbon recipe), without the sugar topping",
        "For the filling: 50g soft butter, 100g icing sugar, 1 tbsp cocoa, 1 tsp milk",
        "300g milk chocolate"
      ],
      method: [
        "Roll the bourbon dough to 4mm and cut into 8 × 3cm fingers. Bake for 12–15 minutes and cool.",
        "Beat the filling together and sandwich the biscuits in pairs. Chill for 15 minutes.",
        "Melt the chocolate. Dip each bar, letting the excess drip off, and place on baking paper.",
        "Drag a fork along the top for the classic ridges.",
        "Leave to set, then wrap in foil and write a bad joke on each one."
      ]
    },
    art: { t: "penguin" }
  },
  {
    id: "chocolate-fingers",
    name: "Chocolate Fingers",
    aka: "The Ten-Finger Exercise",
    category: "Chocolate",
    year: 1951,
    yearLabel: "1951",
    origin: "Bournville, Birmingham",
    maker: "Cadbury",
    dunk: 2,
    dunkSecs: 2,
    kcal: 30,
    tags: ["chocolate", "milk chocolate", "thin", "party", "children"],
    blurb: "Slender biscuit sticks dipped in milk chocolate. One is never enough; the box is rarely enough.",
    description: "Thin, crisp biscuit fingers coated in a generous layer of milk chocolate. They're perfect for nibbling, building fences on birthday cakes, or a quick melting dip in a hot cuppa.",
    history: "Cadbury introduced Chocolate Fingers in 1951, and they soon became a party-plate essential. Their simple formula of plain biscuit and milk chocolate has made them one of the best-loved chocolate biscuits in Britain.",
    fact: "Line them up round a sponge cake and tie with a ribbon and you've made a 'log fence' cake, a staple of British birthday parties.",
    recipe: {
      makes: "About 30",
      time: "40 minutes, plus setting",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "100g soft unsalted butter",
        "50g caster sugar",
        "150g plain flour",
        "1–2 tbsp milk",
        "200g milk chocolate"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Cream the butter and sugar, then mix in the flour and enough milk to make a smooth dough.",
        "Roll out to 4mm and cut into 8 × 1cm fingers.",
        "Bake for 8–10 minutes until pale golden, then cool completely.",
        "Melt the chocolate, dip each finger to coat, then lay on baking paper to set."
      ]
    },
    art: { t: "fingers" }
  },
  {
    id: "bath-oliver",
    name: "Bath Oliver",
    aka: "The Doctor's Biscuit",
    category: "Plain & Simple",
    year: 1750,
    yearLabel: "c. 1750",
    origin: "Bath, Somerset",
    maker: "Dr William Oliver",
    dunk: 4,
    dunkSecs: 6,
    kcal: 45,
    tags: ["cheese", "savoury", "cracker", "georgian", "bath", "doctor"],
    blurb: "A dry, savoury Georgian biscuit invented by a doctor and stamped with his own face.",
    description: "A plain, crisp, barely sweet biscuit that's ideal with cheese, traditionally stamped with a portrait of its inventor. It's dry, delicate and very refined, the sort of biscuit that expects to be served on a silver tray.",
    history: "Dr William Oliver, a physician in Georgian Bath, created the biscuit around 1750 as a plain, digestible food for his patients, who came to take the spa waters. The story goes that on his deathbed he gave the recipe to his coachman, Atkins, along with £100 and ten sacks of flour. Atkins went into business and made his fortune.",
    fact: "Bath Olivers are one of the few biscuits to carry a real person's portrait. Dr Oliver gazes out from every one.",
    recipe: {
      makes: "About 20",
      time: "1 hour 45 minutes (including rising)",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "225g plain flour",
        "½ tsp fast-action dried yeast",
        "½ tsp salt",
        "40g unsalted butter",
        "100ml warm milk"
      ],
      method: [
        "Rub the butter into the flour and salt, then stir in the yeast.",
        "Add the warm milk and knead for 5 minutes to make a smooth, firm dough. Cover and leave somewhere warm for 1 hour.",
        "Heat the oven. Roll the dough out very thinly, about 2mm, and cut into 7cm rounds.",
        "Prick all over with a fork and place on lined baking trays.",
        "Bake for 20–25 minutes until crisp and only lightly coloured. Cool completely and serve with good cheese."
      ]
    },
    art: { t: "round", fill: "#ECD6A8", holes: true, portrait: true, r: 68 }
  },
  {
    id: "empire-biscuit",
    name: "Empire Biscuit",
    aka: "The Iced Jam Sandwich",
    category: "Jam & Fruit",
    year: 1914,
    yearLabel: "c. 1914",
    origin: "Scotland",
    maker: "Scottish and Northern Irish bakeries",
    dunk: 2,
    dunkSecs: 2,
    kcal: 170,
    tags: ["jam", "icing", "cherry", "scottish", "northern ireland", "bakery"],
    blurb: "Two shortcake rounds, a layer of jam, white icing and a cherry on top. A Scottish bakery-window classic.",
    description: "Two buttery shortcake rounds sandwiched with raspberry jam, topped with thick white glacé icing and finished with half a glacé cherry or a jelly sweet. Sweet, sticky and best bought from a bakery in a paper bag.",
    history: "This biscuit was once known as the Linzer biscuit or German biscuit. During the First World War, with anti-German feeling running high, it was patriotically renamed the Empire biscuit. It remains a much-loved bakery treat in Scotland and Northern Ireland.",
    fact: "Purists insist on a glacé cherry on top. Rebels use a jelly tot. Either way, it's always eaten last.",
    recipe: {
      makes: "About 10",
      time: "1 hour",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "225g plain flour",
        "150g cold unsalted butter, cubed",
        "75g caster sugar",
        "½ tsp ground cinnamon (optional)",
        "5 tbsp raspberry jam",
        "150g icing sugar",
        "1–2 tbsp water",
        "5 glacé cherries, halved"
      ],
      method: [
        "Rub the butter into the flour and cinnamon, stir in the sugar and knead to a smooth dough. Chill for 20 minutes.",
        "Heat the oven. Roll to 4mm and cut 7cm rounds.",
        "Bake for 10–12 minutes until just pale gold, then cool completely.",
        "Sandwich pairs together with jam.",
        "Mix the icing sugar with just enough water to make a thick icing, spread it over the tops and press half a cherry into the centre of each."
      ]
    },
    art: { t: "empire" }
  },
  {
    id: "cornish-fairing",
    name: "Cornish Fairing",
    aka: "The Fair Biscuit",
    category: "Ginger & Spice",
    year: 1886,
    yearLabel: "1886",
    origin: "Truro, Cornwall",
    maker: "Furniss of Truro",
    dunk: 4,
    dunkSecs: 7,
    kcal: 70,
    tags: ["ginger", "spice", "cornish", "golden syrup", "crackled", "regional"],
    blurb: "A crackled, golden ginger biscuit that was once a treat bought at Cornish fairs.",
    description: "A crunchy, golden, crackle-topped biscuit with warm ginger and sweet spice, made with plenty of golden syrup. It's crisper and more delicate than a ginger nut, with a toffee-ish crunch.",
    history: "'Fairings' were sweet treats bought as gifts at country fairs. In Cornwall the name became attached to this spiced biscuit. John Cooper Furniss began baking them commercially in Truro in 1886, and Cornish fairings are still made in the county today.",
    fact: "The trick to the fairing's crackled top is moving it from a hot shelf to a cooler one partway through baking, which makes the surface split.",
    recipe: {
      makes: "About 16",
      time: "30 minutes",
      oven: { c: 200, fan: 180, gas: 6 },
      ingredients: [
        "100g self-raising flour",
        "½ tsp bicarbonate of soda",
        "1 tsp ground ginger",
        "½ tsp mixed spice",
        "½ tsp ground cinnamon",
        "50g unsalted butter",
        "50g caster sugar",
        "3 tbsp golden syrup"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Sift the flour, bicarbonate and spices, then rub in the butter and stir in the sugar.",
        "Warm the syrup until runny and mix in to make a soft dough.",
        "Roll into walnut-sized balls and place well apart on the trays.",
        "Bake on the top shelf for 7 minutes, then move to a lower shelf for 3–4 minutes more so the tops crack. Cool on the tray."
      ]
    },
    art: { t: "round", fill: "#B7742F", cracks: 9, r: 64, sheen: true }
  },
  {
    id: "shrewsbury-biscuit",
    name: "Shrewsbury Biscuit",
    aka: "The Shrewsbury Cake",
    category: "Buttery & Short",
    year: 1650,
    yearLabel: "17th century",
    origin: "Shrewsbury, Shropshire",
    maker: "Shropshire bakers",
    dunk: 3,
    dunkSecs: 3,
    kcal: 90,
    tags: ["lemon", "currants", "butter", "fluted", "regional", "historic"],
    blurb: "A crisp, lemony, currant-studded round with a fluted edge and centuries of history.",
    description: "A large, thin, crisp butter biscuit with a fluted edge, flavoured with lemon zest and studded with currants, then dusted with sugar. It's buttery, fragrant and delicate, and very much a biscuit for a proper tea.",
    history: "Shrewsbury biscuits, or 'cakes' as they were first called, have been baked in the Shropshire town since at least the 17th century. They were famous enough for William Congreve to write 'as short as a Shrewsbury cake' in his 1700 play The Way of the World.",
    fact: "Early Shrewsbury cakes were often flavoured with rosewater or caraway; lemon and currants came later and stuck.",
    recipe: {
      makes: "About 16",
      time: "40 minutes",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "100g soft unsalted butter",
        "75g caster sugar, plus extra for dusting",
        "1 egg yolk",
        "200g plain flour",
        "Finely grated zest of 1 lemon",
        "50g currants",
        "1–2 tbsp milk"
      ],
      method: [
        "Heat the oven and line two baking trays.",
        "Cream the butter and sugar, then beat in the yolk.",
        "Stir in the flour, lemon zest and currants, adding milk to make a firm dough.",
        "Roll out to 5mm and cut with a 7cm fluted cutter.",
        "Bake for 12–15 minutes until pale golden at the edges. Dust with caster sugar while still warm."
      ]
    },
    art: { t: "round", fill: "#EDCB8C", fluted: { n: 16, a: 5 }, currants: true, sugar: true }
  },
  {
    id: "iced-gems",
    name: "Iced Gems",
    aka: "Party Jewels",
    category: "Teatime Treats",
    year: 1910,
    yearLabel: "Early 1900s",
    origin: "Britain",
    maker: "Jacob's and others",
    dunk: 1,
    dunkSecs: 1,
    kcal: 6,
    tags: ["tiny", "icing", "colourful", "children", "party", "crunchy"],
    blurb: "Tiny crunchy biscuits crowned with stars of hard pastel icing. Eat the icing first. Everybody does.",
    description: "Miniature, crunchy biscuit buttons, each topped with a swirled star of hard, brightly coloured icing. They're small and sugary, made for small hands and party bags.",
    history: "Iced Gems have been a children's party favourite for well over a century, with Jacob's selling them in their familiar bags for generations. They're a pure nostalgia trip for most British adults, and many grown-ups still bite the icing off first.",
    fact: "The icing on an Iced Gem is piped on and then dried hard, which is why it pops off in one satisfying piece.",
    recipe: {
      makes: "About 60 tiny gems",
      time: "1 hour, plus drying",
      oven: { c: 170, fan: 150, gas: 3 },
      ingredients: [
        "100g plain flour",
        "25g caster sugar",
        "40g cold unsalted butter, cubed",
        "1–2 tbsp milk",
        "1 egg white",
        "250g icing sugar",
        "A few food colourings"
      ],
      method: [
        "Rub the butter into the flour, stir in the sugar and add milk to make a firm dough.",
        "Heat the oven. Roll to 3mm and cut tiny rounds with a 2.5cm cutter.",
        "Bake for 8–10 minutes until pale golden, then cool completely.",
        "Whisk the egg white with the icing sugar to make stiff royal icing. Divide and colour.",
        "Pipe a tall star of icing onto each biscuit with a small star nozzle and leave to dry hard for several hours."
      ]
    },
    art: { t: "gems" }
  },
  {
    id: "wagon-wheel",
    name: "Wagon Wheel",
    aka: "The Shrinking Wheel",
    category: "Teatime Treats",
    year: 1948,
    yearLabel: "1948",
    origin: "Britain",
    maker: "Created by Garry Weston; now Burton's",
    dunk: 2,
    dunkSecs: 2,
    kcal: 165,
    tags: ["marshmallow", "jam", "chocolate", "big", "lunchbox", "nostalgic"],
    blurb: "Biscuit, marshmallow, jam and a chocolate coat, all as big as your hand. Or so you remember.",
    description: "Two large round biscuits sandwiching a layer of marshmallow and jam, all coated in a chocolate-flavoured shell. It's chewy and sweet, with a hearty bite. A lunchbox legend.",
    history: "Garry Weston created the Wagon Wheel in 1948 at his family's biscuit company, and it soon became a treat across Britain and Australia. It's now made by Burton's. For decades, people have insisted Wagon Wheels have got smaller. The makers say they haven't, and that the eaters have simply got bigger.",
    fact: "The 'they've shrunk!' debate is so famous that it's practically part of the biscuit. Hold one in an adult hand and decide for yourself.",
    recipe: {
      makes: "8",
      time: "1 hour 15 minutes, plus setting",
      oven: { c: 180, fan: 160, gas: 4 },
      ingredients: [
        "150g plain flour",
        "50g caster sugar",
        "75g cold unsalted butter",
        "1 tbsp golden syrup",
        "1–2 tbsp milk",
        "100g white marshmallows",
        "1 tbsp milk (for the marshmallow)",
        "4 tbsp raspberry jam",
        "250g milk chocolate"
      ],
      method: [
        "Rub the butter into the flour, stir in the sugar, syrup and enough milk to make a dough. Roll to 4mm and cut 16 rounds of 8cm.",
        "Bake for 10–12 minutes until pale gold, then cool completely.",
        "Melt the marshmallows with the milk in short bursts in the microwave and spread over half the biscuits.",
        "Spread jam on the remaining biscuits and sandwich together. Chill for 15 minutes.",
        "Melt the chocolate and dip each wheel to coat. Leave on baking paper to set."
      ]
    },
    art: { t: "wheel" }
  }
];

window.BISCUIT_CATEGORIES = [
  "Plain & Simple",
  "Cream Sandwiches",
  "Chocolate",
  "Jam & Fruit",
  "Buttery & Short",
  "Ginger & Spice",
  "Teatime Treats"
];
