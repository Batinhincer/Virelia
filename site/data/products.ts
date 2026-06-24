export interface Product {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  category: string;
  image: string;
  packaging?: string;
  moq?: string;
  origin?: string;
  certifications?: string[];
  hsCode?: string;
}

export const products: Product[] = [

  // ─── Oils & Condiments ────────────────────────────────────────────────────
  {
    slug: "olive-oil",
    title: "Olive Oil",
    shortDesc: "Export-grade extra virgin olive oil from Turkey's Aegean groves — world's 2nd largest olive oil producer, EU-compliant supply at competitive price points",
    longDesc: "Turkey is the world's second-largest olive oil producer, with the Aegean coastal provinces of İzmir, Aydın, and Muğla forming the country's most established growing belt. Virelias sources extra virgin olive oil from producers in this region, where altitude, coastal climate, and centuries of cultivation practice combine to produce oil with clean flavour profiles and low free acidity. The 2024-25 harvest was a record season for Turkish olive oil, with production reaching 505,000 tonnes — creating favourable supply conditions and competitive pricing for international buyers. Suited to food manufacturers requiring a reliable EVOO ingredient, retail importers seeking private label bottling from an EU-compliant origin, and food service distributors serving premium and mid-market segments. Seasonal new-harvest stock available from November, with year-round supply from temperature-controlled storage.",
    category: "Oils & Condiments",
    image: "/products/olive-oil.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "pomegranate-molasses",
    title: "Pomegranate Molasses",
    shortDesc: "Pure-concentrate pomegranate molasses from Turkish fruit — no added sugar, stable Brix, suitable for food manufacturing, specialty retail, and private label",
    longDesc: "Turkey ranks among the world's leading pomegranate producers, with cultivation concentrated in the Aegean and Mediterranean regions where the fruit reaches high natural sugar concentrations and deep colour intensity. Virelias sources pomegranate molasses produced by slow-reducing fresh-pressed juice — no added sugar, no artificial colour, no preservatives — yielding a concentrate with a typical Brix of 65–72 and a naturally balanced sweet-sour profile required for consistent food manufacturing applications. Pomegranate molasses is a core ingredient in Middle Eastern and Mediterranean cuisine — used in sauces, marinades, salad dressings, and glazes — and is gaining steady traction with European food manufacturers and specialty food retailers. Growing demand across the UK, Germany, and Benelux makes this a strong private label opportunity.",
    category: "Oils & Condiments",
    image: "/products/pomegranate-molasses.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "olives",
    title: "Olives",
    shortDesc: "Turkish table olives — green and black varieties from the world's largest table olive producer, for food service distributors, pizza operators, and specialty food importers",
    longDesc: "Turkey is the world's largest producer of table olives, with production concentrated in the Aegean provinces of Balıkesir, İzmir, and Bursa, and the Marmara region. Our table olive range covers the primary commercial formats: green olives in natural brine or treated, black olives brine-cured, sliced olives for food service and pizza applications, and pitted olives for processing. Available in a full range of calibres. Suitable for food service distributors supplying pizzerias and Italian restaurants, supermarket retail importers building Mediterranean product ranges, food manufacturers incorporating olives into prepared meals and antipasti packs, and specialty food importers. Turkey's dominance in world table olive production supports competitive pricing and reliable year-round supply.",
    category: "Oils & Condiments",
    image: "/products/olives.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "olive-paste",
    title: "Olive Paste",
    shortDesc: "Turkish olive paste (tapenade) — for specialty food retailers, premium food service operators, and Mediterranean product distributors",
    longDesc: "Produced from Turkish-origin olives blended with olive oil and seasoning, our olive paste delivers intense, concentrated olive flavour suited to premium food service and specialty retail applications. Available in black olive and green olive variants, with or without additional herbs and capers depending on specification. A natural product with no artificial additives. Olive paste is in growing demand as a premium condiment and ingredient across European specialty food retail, artisan bakery, and upscale food service — used as a spread, a pizza topping, a pasta ingredient, and a flavouring component. Available in glass jars for retail and food service bulk formats.",
    category: "Oils & Condiments",
    image: "/products/olive-paste.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },

  // ─── Pepper & Chili Products ──────────────────────────────────────────────
  {
    slug: "pepper-paste",
    title: "Pepper Paste",
    shortDesc: "Turkish red pepper paste (biber salçası) — mild and hot variants, a core cooking ingredient for food manufacturers, food service distributors, and Mediterranean food importers",
    longDesc: "Biber salçası is Turkey's most widely produced and exported condiment — a concentrated paste of sun-dried Capsicum annuum peppers cooked to develop depth, natural sweetness, and intense colour. Grown across Turkey's fertile southern and central agricultural regions, the peppers used in our paste are processed by established Turkish facilities operating under EU food safety standards. Available in mild (tatlı) and hot (acı) variants, with salt content adjustable for food manufacturing requirements. A staple ingredient for food manufacturers producing ready meals, soups, and marinades; for food service operations and catering suppliers; and for ethnic food importers supplying Turkish, Balkan, and Middle Eastern grocery channels. Available in retail glass jars and food service tin cans or aseptic bags for industrial quantities.",
    category: "Pepper & Chili Products",
    image: "/products/pepper-paste.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "harissa",
    title: "Harissa",
    shortDesc: "North African-style harissa produced in Turkey — authentic chili-spice profile for food service operators, specialty retailers, and ready meal manufacturers",
    longDesc: "Our harissa is produced in Turkey using locally grown red chili peppers combined with a traditional North African spice blend — cumin, coriander, caraway, garlic, and quality olive oil. Produced by Turkish food processors with established EU export compliance, this harissa delivers the authentic heat intensity and aromatic complexity of the Tunisian original while benefiting from Turkey's shorter shipping lead times to European markets and its advanced food safety infrastructure. Harissa has recorded strong growth across EU and UK markets in recent years, driven by increasing demand for bold flavour profiles in premium ready meals, grilled meat accompaniments, and restaurant kitchens.",
    category: "Pepper & Chili Products",
    image: "/products/harissa.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "ajvar",
    title: "Ajvar",
    shortDesc: "Fire-roasted red pepper and eggplant relish (ajvar) produced in Turkey — for Balkan food distributors and specialty retailers across Germany, Austria, and Northern Europe",
    longDesc: "Ajvar is the defining condiment of the Balkan table — a slow-cooked spread of fire-roasted red peppers and eggplant, balanced with garlic and sunflower oil to a richly flavoured, smoky consistency. Our ajvar is produced in Turkey from locally grown Capsicum annuum peppers, taking advantage of Turkey's large-scale pepper cultivation and food processing capacity to deliver a consistent product at competitive price points. Available in mild and hot variants with no artificial additives. The product has a well-established market across Germany, Austria, Switzerland, the Netherlands, and Scandinavia — primarily serving Balkan diaspora communities, but increasingly attracting mainstream European consumers seeking flavourful artisanal vegetable spreads.",
    category: "Pepper & Chili Products",
    image: "/products/ajvar.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "shatta",
    title: "Shatta",
    shortDesc: "Levantine-style fresh chili sauce (shatta) produced in Turkey — red and green variants for Middle Eastern food distributors and halal grocery importers",
    longDesc: "Shatta is a widely consumed chili condiment across the Levant — a fresh, vibrant sauce of crushed chilies, garlic, and lemon juice that accompanies shawarma, falafel, grilled meats, and mezze across Lebanon, Palestine, Jordan, and Syria. Our shatta is produced in Turkey using Capsicum-family chilies that deliver clean, direct heat without the processed character of many commercial hot sauces. Available in red (tomato-forward) and green (herb-forward) variants. Demand for authentic Levantine condiments continues to grow across European markets with significant Middle Eastern and Arab communities — particularly the UK, Germany, the Netherlands, Sweden, and Denmark.",
    category: "Pepper & Chili Products",
    image: "/products/shatta.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "lutenitsa",
    title: "Lutenitsa",
    shortDesc: "Bulgarian-style roasted vegetable spread (lutenitsa) produced in Turkey — for Eastern European food distributors and specialty retailers across the EU",
    longDesc: "Lutenitsa is a traditional Bulgarian spread of slow-cooked roasted peppers, tomatoes, eggplant, carrots, and onions — a daily staple in Bulgarian, Serbian, and North Macedonian households and a familiar comfort food for the broader Balkan diaspora. Our lutenitsa is produced in Turkey from locally grown Capsicum annuum peppers and seasonal vegetables, maintaining the traditional texture and flavour balance of the original while meeting EU food safety standards for import. Bulgaria, Romania, and the broader Balkan diaspora across Germany, Austria, the UK, and Scandinavia represent a substantial and consistent market.",
    category: "Pepper & Chili Products",
    image: "/products/lutenitsa.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "sambal",
    title: "Sambal",
    shortDesc: "Sambal sauce manufactured in Turkey from Capsicum annuum peppers — a proven supply solution for Dutch and Benelux importers seeking EU compliance and shorter lead times",
    longDesc: "Virelias has an established track record supplying sambal sauce to the Dutch market, produced by Turkish manufacturers using locally grown Capsicum annuum peppers. Turkey's warm southern climate is well-suited to Capsicum cultivation, delivering the heat level and flavour profile required for authentic sambal — while enabling production under full EU food safety standards and eliminating the compliance overhead associated with Southeast Asian sourcing. Sambal is the Netherlands' most consumed condiment, with consistent high-volume demand across retail, food service, and the broader Benelux market. Turkish-origin sambal offers significantly shorter transit times versus Indonesia or Malaysia, EU-compliance from production, and competitive pricing.",
    category: "Pepper & Chili Products",
    image: "/products/sambal.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },

  // ─── Ready-to-Use Sauces ──────────────────────────────────────────────────
  {
    slug: "pizza-sauces",
    title: "Pizza Sauces",
    shortDesc: "Italian-style pizza sauce produced in Turkey from locally grown processing tomatoes — for pizzerias, QSR chains, ready meal manufacturers, and food service distributors",
    longDesc: "Turkey is among the world's largest tomato producers, with processing tomato cultivation concentrated in the Bursa, Balıkesir, and Central Anatolian regions — varieties bred for high dry matter content, concentrated colour, and robust flavour ideal for sauce production. Our pizza sauce range is produced from locally sourced Turkish processing tomatoes, cooked to a texture that holds on dough without running, and available in classic marinara, arrabbiata, and herb-infused variants. Suited to pizzerias and quick-service restaurant chains requiring consistent bulk supply, ready meal manufacturers needing a reliable pizza sauce component, and food service distributors serving Italian and pizza dining concepts.",
    category: "Ready-to-Use Sauces",
    image: "/products/pizza-sauce.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "pasta-sauces",
    title: "Pasta Sauces",
    shortDesc: "Italian-style pasta sauce range produced in Turkey — tomato-based variants for food service distributors, restaurant supply, and ready meal manufacturers",
    longDesc: "Our pasta sauce range draws on Turkey's large-scale processing tomato production to deliver an authentic Italian-style base at competitive prices. The core range covers the variants food service operations need most: marinara, arrabbiata, basil and tomato, and a Bolognese-style meat base. Each sauce is slow-cooked to develop layered flavour and a stable, service-ready consistency that holds under reheating without becoming watery. Strong fit for food service distributors supplying Italian restaurants, casual dining chains, and hotel catering; for ready meal manufacturers seeking a quality sauce component; and for food service wholesalers requiring consistent volume pricing.",
    category: "Ready-to-Use Sauces",
    image: "/products/pasta-sauce.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "doner-sauces",
    title: "Doner Sauces",
    shortDesc: "Authentic Turkish doner and kebab sauce range — for kebab distributors, quick-service operators, and food service wholesalers across Europe",
    longDesc: "Doner kebab is one of Europe's most consumed street food categories, generating year-round high-volume demand for the sauce accompaniments that define the product: garlic yogurt, spicy tomato-pepper ezme, and herb-forward green sauce. Virelias sources this range from Turkish producers — the origin market for doner culture — where the flavour profiles are developed to the authentic standard that European kebab operators and their customers expect. Established demand exists across Germany, the Netherlands, the UK, France, Austria, and Scandinavia, where tens of thousands of kebab shops and quick-service operators require reliable bulk sauce supply.",
    category: "Ready-to-Use Sauces",
    image: "/products/doner-sauce.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },

  // ─── Preserved Vegetables ─────────────────────────────────────────────────
  {
    slug: "roasted-red-pepper",
    title: "Roasted Red Peppers",
    shortDesc: "Fire-roasted and preserved red peppers from Turkey — a high-demand ingredient for antipasti producers, pizza manufacturers, and food service distributors",
    longDesc: "Turkey's pepper-growing regions — concentrated along the Aegean coast and in the southeastern provinces — produce Capsicum annuum varieties with excellent flesh thickness and natural sweetness, ideally suited to fire-roasting and preservation. Our roasted red peppers are charred to develop smoky depth, hand-peeled to remove skin cleanly, and preserved in oil or brine depending on the buyer's application requirements. Roasted red peppers are in sustained demand across multiple food industry segments: antipasti producers, pizza topping manufacturers, sandwich and wrap manufacturers, and food service distributors serving Mediterranean restaurant concepts. Turkish-origin product offers strong price competitiveness against Spanish and Italian alternatives.",
    category: "Preserved Vegetables",
    image: "/products/roasted-red-pepper.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "roasted-aubergine",
    title: "Roasted Aubergine",
    shortDesc: "Char-grilled and preserved aubergine from Turkey — for food manufacturers, mezze producers, and food service operators working with Mediterranean ingredients",
    longDesc: "Turkey is one of the world's largest aubergine producers, with cultivation concentrated in the Aegean and Mediterranean coastal regions where the long growing season delivers fruit with ideal flesh density and low bitterness. Our roasted aubergine is prepared using direct-flame grilling — the traditional method that develops the characteristic smokiness and creamy interior texture — then preserved in olive oil with garlic and herbs. A key ingredient for food manufacturers producing baba ghanoush, moussaka components, ready meal vegetable mixes, and mezze packs. Turkey's aubergine production season runs from late spring through autumn, with year-round supply available from preserved stocks.",
    category: "Preserved Vegetables",
    image: "/products/roasted-aubergine.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "pickles",
    title: "Mediterranean Pickles",
    shortDesc: "Traditional Turkish-style mixed pickles (turşu) — for food service distributors, kebab operators, and specialty food retailers across the EU and UK",
    longDesc: "Turşu — the centuries-old Turkish tradition of pickling vegetables in seasoned vinegar-salt brine — produces a product that is fundamentally different in character from Western European pickles: more complex in spice, more varied in vegetable composition, and central to Turkish and broader Middle Eastern dining culture. Our Mediterranean pickle range includes mixed assortments (cucumber, pepper, cauliflower, carrot, turnip) and individual varieties, each pickled in a balanced brine with traditional spice additions. In consistent year-round demand across European markets with Turkish, Middle Eastern, and Balkan communities — kebab shops and doner operators in Germany, the Netherlands, Austria, and Scandinavia consume pickles in high volume alongside their core meat products.",
    category: "Preserved Vegetables",
    image: "/products/pickles.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "preserved-vegetables",
    title: "Preserved Vegetables",
    shortDesc: "A range of preserved Turkish seasonal vegetables — for food manufacturers, mezze and antipasti producers, food service distributors, and specialty importers",
    longDesc: "Turkey's diverse agricultural regions produce a wide spectrum of vegetables suited to preservation — from Aegean artichokes and sun-dried tomatoes to marinated courgettes, vine leaves, and mixed caponata-style preparations. Virelias sources from established Turkish processors operating year-round facilities with EU food safety compliance and consistent production capacity across both standard and private label formats. This category serves food manufacturers incorporating Mediterranean vegetable components into ready meals and meal kits, food service distributors supplying mezze and antipasti to restaurant chains, and specialty grocery importers building Mediterranean product ranges for retail.",
    category: "Preserved Vegetables",
    image: "/products/preserved-vegetables.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "gherkins",
    title: "Gherkins",
    shortDesc: "Turkish gherkins in brine — a staple for food service distributors, kebab operators, and pickle importers across Europe and the Middle East",
    longDesc: "Turkey is one of the world's largest gherkin producers, with cultivation concentrated in the Marmara and Aegean regions. Our gherkins are harvested at the optimal size for commercial pickling and processed in natural vinegar-salt brine with dill and spice additions. Available in whole, sliced, and relish formats across a range of jar, tin, and drum sizes to suit retail and food service requirements. In consistent demand across food service and retail — particularly for kebab operators, burger chains, sandwich manufacturers, and pickle distributors. Turkey offers strong price competitiveness against Dutch and Indian origins for the European market, with established EU food safety compliance.",
    category: "Preserved Vegetables",
    image: "/products/gherkins.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "vine-leaves",
    title: "Vine Leaves (Brined)",
    shortDesc: "Brined grape vine leaves from Turkey — for dolma manufacturers, Mediterranean food distributors, and specialty grocery importers",
    longDesc: "Turkey's vine-growing regions — concentrated in the Aegean, Marmara, and Mediterranean provinces — produce vine leaves with the thin texture and supple character ideal for dolma production. Our vine leaves are harvested in spring at peak tenderness, then preserved in seasoned brine to maintain flexibility and natural colour. A staple ingredient for dolma manufacturers, ready-meal producers incorporating stuffed vegetable lines, food service distributors supplying Greek, Turkish, Lebanese, and broader Mediterranean restaurant concepts, and specialty grocery importers building Middle Eastern and Mediterranean product ranges.",
    category: "Preserved Vegetables",
    image: "/products/vine-leaves.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "capers",
    title: "Capers",
    shortDesc: "Turkish capers in brine — one of Turkey's significant specialty produce exports, in consistent demand for European food service, antipasti production, and specialty retail",
    longDesc: "Turkey is one of the world's largest producers and exporters of capers, with production centred on the Aegean coast where Capparis spinosa grows prolifically in rocky coastal terrain. Turkish capers are harvested by hand before the bud opens, sorted by size, and preserved in brine or white wine vinegar. Available in nonpareil (7mm and under), surfines, capucines, capotes, fines, and grusas grades. A key ingredient for Italian, Spanish, and broader Mediterranean cuisine — used in pasta, pizza toppings, salads, and sauces. Demand is consistent across European retail and the food service sector, particularly for Italian restaurant supply and antipasti production.",
    category: "Preserved Vegetables",
    image: "/products/capers.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },

  // ─── Dried Fruits & Nuts ──────────────────────────────────────────────────
  {
    slug: "dried-apricots",
    title: "Dried Apricots",
    shortDesc: "Turkish dried apricots from Malatya — the world's most recognised origin, exported globally for snacking, food manufacturing, and ingredient use",
    longDesc: "Malatya province in eastern Turkey is the world's leading production centre for dried apricots, accounting for the majority of global dried apricot exports. The region's continental climate — hot dry summers and cold winters — produces apricots with exceptionally high natural sugar content and concentrated flavour. Available in whole, halved, and diced formats, in natural (sulphite-free) and sulphur-treated variants for extended colour retention. In demand from snack manufacturers, confectionery producers, bakery ingredient suppliers, muesli and breakfast cereal manufacturers, food service distributors, and specialty food retailers globally. Both organic and conventional supply available.",
    category: "Dried Fruits & Nuts",
    image: "/products/dried-apricots.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "dried-figs",
    title: "Dried Figs",
    shortDesc: "Turkish dried figs from the Aegean — world-leading origin, available in multiple grades for food manufacturing, retail, and specialty food distribution",
    longDesc: "The Aegean region of Turkey — particularly Aydın province — produces the world's most commercially significant dried fig harvest, with varieties including Sarılop and Bursa Siyahı dominating export markets. Turkish dried figs are sun-dried to develop concentrated sweetness and a characteristic soft, jammy texture. Available in select, choice, and standard grades in whole and diced formats. Used by confectionery manufacturers, bakeries, health food brands, snack producers, and specialty food retailers globally. Turkey accounts for the majority of world dried fig exports, providing reliable annual supply and competitive pricing.",
    category: "Dried Fruits & Nuts",
    image: "/products/dried-figs.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "sultanas",
    title: "Sultanas",
    shortDesc: "Turkish sultanas (seedless dried grapes) from the Aegean — one of Turkey's largest fruit exports, for food manufacturers, bakeries, and wholesale distributors",
    longDesc: "Turkey is one of the world's top sultana producers, with cultivation concentrated in the Aegean provinces of İzmir, Manisa, and Denizli. Produced from seedless grape varieties sun-dried on paper trays, Turkish sultanas are available in extra fancy, fancy, select, and standard grades with moisture content typically between 15–18%. A core ingredient for bakeries, breakfast cereal and muesli manufacturers, confectionery producers, snack manufacturers, and food service distributors. Turkey's scale of production supports consistent year-round supply, with new crop available from August to September annually.",
    category: "Dried Fruits & Nuts",
    image: "/products/sultanas.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "hazelnuts",
    title: "Hazelnuts",
    shortDesc: "Turkish hazelnuts — world's largest producer at ~70% of global supply, for confectionery, chocolate manufacturing, bakeries, and food manufacturers",
    longDesc: "Turkey produces approximately 70% of the world's hazelnuts, with the Black Sea coastal region — particularly Giresun, Ordu, and Trabzon provinces — forming the global centre of cultivation. Available in raw natural, blanched, and diced formats across standard commercial calibres (11–12mm, 12–13mm, 13–14mm and above). Giresun-origin hazelnuts command a premium for their consistently superior flavour profile. The primary B2B market is the confectionery and chocolate manufacturing sector — hazelnut paste, praline, and whole or chopped hazelnuts are essential raw materials for European chocolate producers. Additional demand from bakeries, ice cream manufacturers, breakfast cereal producers, and snack manufacturers.",
    category: "Dried Fruits & Nuts",
    image: "/products/hazelnuts.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "pistachio-paste",
    title: "Pistachio Paste",
    shortDesc: "Turkish pistachio paste from Gaziantep — premium B2B ingredient for baklava producers, gelato manufacturers, chocolatiers, and confectionery businesses",
    longDesc: "Gaziantep is the world centre of pistachio cultivation and processing, with the Antep variety commanding the highest prices in global markets for its vibrant green colour, intense flavour, and low shell percentage. Our pistachio paste is produced from freshly shelled Gaziantep pistachios ground to a smooth consistency for industrial baking and confectionery applications. Available in natural (unsweetened) and sweetened variants across a range of coarseness levels. The primary market is baklava and Turkish sweets production — Gaziantep is the epicentre of baklava manufacturing. Strong additional demand from gelato producers across Italy and Germany, chocolatiers, pastry chefs, and premium confectionery brands globally.",
    category: "Dried Fruits & Nuts",
    image: "/products/pistachio-paste.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },

  // ─── Tahini & Nut Spreads ─────────────────────────────────────────────────
  {
    slug: "tahini",
    title: "Tahini",
    shortDesc: "Cold-pressed tahini (sesame paste) — for hummus manufacturers, food service distributors, health food brands, and specialty food importers",
    longDesc: "Tahini is produced from hulled sesame seeds cold-pressed to a smooth, rich paste. Our tahini is produced by established Turkish processors using high-quality sesame, resulting in a stable product with a natural oil layer that re-incorporates with stirring. Available in light roast and dark roast profiles — lighter roasts for hummus and dressings, darker for halva and confectionery. The primary B2B market is hummus manufacturers — a fast-growing segment across Europe and North America — alongside falafel producers, health food distributors, specialty food retailers, and food service operators. Available in retail jars, food service buckets, and industrial drums.",
    category: "Tahini & Nut Spreads",
    image: "/products/tahini.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "grape-molasses",
    title: "Grape Molasses",
    shortDesc: "Turkish grape molasses (üzüm pekmezi) — natural fruit concentrate from Aegean grape varieties, for specialty food distributors, ethnic food importers, and health food retail",
    longDesc: "Grape molasses (pekmez) is produced by slow-reducing fresh grape must without added sugar or preservatives, yielding a thick, naturally sweet syrup with a distinctive tartness and deep amber colour. Our grape molasses is produced from Aegean and Central Anatolian grape varieties using traditional evaporation methods that preserve the natural mineral content and flavour complexity of the fruit. A traditional staple of Turkish and Middle Eastern breakfast culture, consumed with tahini or used as a natural sweetener in cooking and baking. Growing interest in natural, minimally processed sweeteners is expanding the market into health food and specialty grocery retail.",
    category: "Tahini & Nut Spreads",
    image: "/products/grape-molasses.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "tahini-halva",
    title: "Tahini Halva",
    shortDesc: "Turkish tahini halva — classic sesame confection in multiple variants, for specialty food importers, ethnic food distributors, and health food retailers",
    longDesc: "Tahini halva is produced by combining tahini with sugar syrup and aerating the mixture to create a crumbly, melt-in-the-mouth confection with a distinctive nutty-sweet flavour. Turkey is a major producer and exporter of tahini halva, with well-established production infrastructure and strong EU export compliance. Available in plain, pistachio, cocoa, and vanilla variants, in retail-sliced blocks and bulk formats. In consistent demand across Middle Eastern, Balkan, and Eastern European diaspora communities in Western Europe, as well as a growing mainstream market driven by interest in high-protein, plant-based snacking.",
    category: "Tahini & Nut Spreads",
    image: "/products/tahini-halva.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },

  // ─── Tomato Products ──────────────────────────────────────────────────────
  {
    slug: "tomato-paste",
    title: "Tomato Paste",
    shortDesc: "Turkish tomato paste — double and triple concentrate from one of the world's largest processing tomato producers, for food manufacturers, food service, and private label",
    longDesc: "Turkey is among the world's top tomato paste producers and exporters, with processing concentrated in the Central Anatolian and Marmara regions where processing tomato varieties are cultivated at scale for their high dry matter content. Our tomato paste is available in 28–30% Brix (double concentrate) and 36–38% Brix (triple concentrate), produced under EU food safety standards with full traceability. A core ingredient for food manufacturers producing pasta sauces, pizza sauces, ready meals, soups, and marinades. Turkey offers strong pricing against Italian and Chinese origins with EU-compliant production. Available in tins, aseptic bags, and drums for industrial volumes.",
    category: "Tomato Products",
    image: "/products/tomato-paste.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "sun-dried-tomatoes",
    title: "Sun-Dried Tomatoes",
    shortDesc: "Turkish sun-dried tomatoes — Aegean-origin for specialty food retailers, antipasti producers, and food service distributors across Europe and beyond",
    longDesc: "Turkey's Mediterranean and Aegean climates produce ideal conditions for sun-drying tomatoes — high summer temperatures, low humidity, and long daylight hours accelerate moisture removal while concentrating natural sugars and flavour compounds. Available in julienned and halved formats, in oil-packed and dry variants, and in a range of moisture levels depending on application requirements. In sustained demand for antipasti production, specialty food retail, pizza toppings, pasta ingredient use, and food service applications across premium restaurant and catering segments. Turkey offers strong competitiveness against Italian-origin product at the ingredient and private label level.",
    category: "Tomato Products",
    image: "/products/sun-dried-tomatoes.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },

  // ─── Grains & Pulses ──────────────────────────────────────────────────────
  {
    slug: "chickpeas",
    title: "Chickpeas",
    shortDesc: "Turkish chickpeas — large-calibre kabuli variety from a major global supplier, for hummus manufacturers, food service distributors, and dry goods importers",
    longDesc: "Turkey is one of the world's top chickpea producing nations, with cultivation concentrated in Central Anatolia and the Southeastern regions. Turkish chickpeas are characterised by their large, even calibre and smooth skin — qualities that command premium positioning in export markets. Available in kabuli variety in standard commercial calibres, as well as cooked and canned formats. A core ingredient for hummus manufacturers, falafel producers, ready meal manufacturers incorporating plant-based protein, food service distributors, and dry goods importers supplying Middle Eastern, South Asian, and African community grocery retail. Organic supply available on request.",
    category: "Grains & Pulses",
    image: "/products/chickpeas.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "lentils",
    title: "Lentils",
    shortDesc: "Turkish lentils — red, green, and brown varieties from a major global supplier, for soup manufacturers, ready meal producers, and dry goods distributors",
    longDesc: "Turkey is one of the world's most significant lentil producers, with red lentils and green lentils produced at scale in the southeastern and Central Anatolian regions. Turkish red lentils are valued in international markets for their consistent size, bright colour, and fast cooking time — key attributes for soup manufacturers and food service operations. Available in split and whole formats across red, green, and brown varieties. Red lentils are a staple raw material for soup manufacturers and ready meal producers. Turkey is a reliable annual supplier across volume tiers, with strong EU export compliance. Both conventional and organic supply available.",
    category: "Grains & Pulses",
    image: "/products/lentils.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "bulgur",
    title: "Bulgur",
    shortDesc: "Turkish bulgur wheat — the world's largest producer and exporter, available in four grinds for food manufacturers, ethnic food distributors, and health food retailers",
    longDesc: "Bulgur is produced by parboiling, drying, and milling durum wheat — a process that originated in Anatolia and has been refined over centuries of Turkish production. Turkey is the world's largest producer and exporter of bulgur, with processing concentrated in the Central Anatolian wheat belt. Available in fine, medium, coarse, and very coarse grinds suited to different culinary applications. Serves food manufacturers producing stuffed vegetable mixes, ready-to-cook grain pouches, and tabouleh; food service distributors supplying Turkish, Middle Eastern, and Mediterranean restaurant concepts; and health food retailers positioning bulgur as a nutritious whole grain alternative.",
    category: "Grains & Pulses",
    image: "/products/bulgur.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },

  // ─── Herbs & Spices ───────────────────────────────────────────────────────
  {
    slug: "sumac",
    title: "Sumac",
    shortDesc: "Turkish sumac — a signature Middle Eastern spice from Turkey's leading growing regions, for spice distributors, Middle Eastern food importers, and food manufacturers",
    longDesc: "Sumac (Rhus coriaria) is harvested from wild and cultivated shrubs across eastern and southeastern Turkey, particularly in the Gaziantep, Urfa, and Hatay regions. The dried, ground berries produce a deep burgundy powder with a distinctive sour, fruity flavour irreplaceable in Middle Eastern and Eastern Mediterranean cuisine. Available in coarse and fine grind. A core spice for Middle Eastern food distributors supplying kebab shops, Lebanese and Turkish restaurants, and specialty grocery retail. Growing demand in mainstream European and North American markets as interest in Middle Eastern cuisine expands. Used as an ingredient in za'atar and other spice blends.",
    category: "Herbs & Spices",
    image: "/products/sumac.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "pul-biber",
    title: "Pul Biber (Red Pepper Flakes)",
    shortDesc: "Turkish pul biber (red pepper flakes) — Urfa and Aleppo-style varieties, a defining Turkish spice for food service operators, spice distributors, and specialty retailers",
    longDesc: "Pul biber is produced from semi-dried Capsicum annuum peppers grown in Turkey's southeastern provinces — particularly Urfa and the broader Southeastern Anatolian pepper belt. The peppers are dried, deseeded, and crushed to a coarse flake with a characteristic oily texture from the natural pepper oils retained in the skin. Available in standard red pepper flakes (mild-medium heat), Urfa isot (dark, smoky, low heat), and Aleppo-style (fruity, medium heat) varieties. One of the most widely used spices in Turkish and Middle Eastern cooking. Growing demand across European food service and specialty food retail as Turkish and Middle Eastern food culture spreads.",
    category: "Herbs & Spices",
    image: "/products/pul-biber.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "oregano",
    title: "Oregano",
    shortDesc: "Turkish oregano (kekik) — Aegean-harvested with high essential oil content, for spice distributors, food manufacturers, and food service supply",
    longDesc: "Turkish oregano (kekik) is harvested from the Aegean and Mediterranean coastal regions, where the combination of limestone soil, coastal climate, and traditional harvesting methods produces an herb with characteristically high essential oil content and intense aroma. Available in whole dried, rubbed, and ground formats across standard commercial specifications. In consistent year-round demand from spice distributors, food manufacturers producing pizza sauces and seasoning blends, and food service distributors supplying Italian and Mediterranean restaurant concepts. Turkey is one of Europe's most competitive oregano sources in terms of essential oil content and price.",
    category: "Herbs & Spices",
    image: "/products/oregano.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
  {
    slug: "bay-leaves",
    title: "Bay Leaves",
    shortDesc: "Turkish bay leaves — Turkey produces the majority of the world's exported bay leaves, for food manufacturers, spice distributors, and food service operators globally",
    longDesc: "Turkey is the world's dominant supplier of bay leaves (Laurus nobilis) for international trade, with production concentrated in the Aegean coastal province of İzmir where the laurel tree grows prolifically. Turkish bay leaves are harvested from cultivated and wild trees, shade-dried to preserve colour and essential oil content, and available in whole leaf, crumbled, and ground formats. Bay leaves are a staple culinary herb used in soups, stews, sauces, and marinades across European and global cuisine. Food manufacturers and industrial spice processors are the primary B2B buyers. Turkey's dominance in this category means reliable annual supply at competitive pricing.",
    category: "Herbs & Spices",
    image: "/products/bay-leaves.jpg",
    origin: "Turkey",
    packaging: "Custom packaging available — formats and sizes on request",
    moq: "From 1 pallet — flexible based on your requirements",
  },
];

export const categories = [
  "Oils & Condiments",
  "Pepper & Chili Products",
  "Ready-to-Use Sauces",
  "Preserved Vegetables",
  "Dried Fruits & Nuts",
  "Tahini & Nut Spreads",
  "Tomato Products",
  "Grains & Pulses",
  "Herbs & Spices",
];

export interface CategoryInfo {
  name: string;
  slug: string;
  description: string;
}

export const categoryInfo: CategoryInfo[] = [
  {
    name: "Oils & Condiments",
    slug: "oils-condiments",
    description: "Extra virgin olive oil, table olives, olive paste, and pomegranate molasses from Turkey — the world's largest table olive producer and second-largest olive oil producer. For food manufacturers, distributors, and specialty food importers.",
  },
  {
    name: "Pepper & Chili Products",
    slug: "pepper-chili-products",
    description: "Turkish pepper paste, harissa, ajvar, sambal, and chili sauces produced in Turkey. From mild spreads to fiery condiments — authentic heat with complex flavour profiles for food manufacturers and distributors.",
  },
  {
    name: "Ready-to-Use Sauces",
    slug: "ready-to-use-sauces",
    description: "Pizza sauces, pasta sauces, and doner sauces produced in Turkey from locally grown processing tomatoes. Professional quality for food service distributors, restaurant supply, and ready meal manufacturers.",
  },
  {
    name: "Preserved Vegetables",
    slug: "preserved-vegetables",
    description: "Roasted peppers, aubergines, pickles, gherkins, vine leaves, and capers from Turkey. Year-round supply for food manufacturers, food service distributors, and specialty food importers.",
  },
  {
    name: "Dried Fruits & Nuts",
    slug: "dried-fruits-nuts",
    description: "Dried apricots from Malatya, dried figs from Aydın, Aegean sultanas, Black Sea hazelnuts, and Gaziantep pistachio paste. Products where Turkey holds world-leading production positions.",
  },
  {
    name: "Tahini & Nut Spreads",
    slug: "tahini-spreads",
    description: "Cold-pressed tahini, grape molasses, and tahini halva from established Turkish producers. High-value ingredients for hummus manufacturers, food service distributors, and specialty food retailers.",
  },
  {
    name: "Tomato Products",
    slug: "tomato-products",
    description: "Tomato paste and sun-dried tomatoes from one of the world's largest processing tomato producers. For food manufacturers, private label distributors, and food service operators.",
  },
  {
    name: "Grains & Pulses",
    slug: "grains-pulses",
    description: "Bulgur, chickpeas, and lentils from Turkey's agricultural heartland. Staple ingredients for food manufacturers, food service distributors, and dry goods importers serving African, Middle Eastern, and European markets.",
  },
  {
    name: "Herbs & Spices",
    slug: "herbs-spices",
    description: "Sumac, pul biber, oregano, and bay leaves — products where Turkey holds dominant global market positions. For spice distributors, food manufacturers, and food service operators worldwide.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categoryInfo.find((c) => c.slug === slug);
}

export function getCategoryByName(name: string): CategoryInfo | undefined {
  return categoryInfo.find((c) => c.name === name);
}

export function getCategorySlug(categoryName: string): string {
  const categoryData = getCategoryByName(categoryName);
  return categoryData?.slug || categoryName.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "");
}

export function getRelatedProducts(currentSlug: string, category: string, limit: number = 4): Product[] {
  return products
    .filter((p) => p.category === category && p.slug !== currentSlug)
    .slice(0, limit);
}
