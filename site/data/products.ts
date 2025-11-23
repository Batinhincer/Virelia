export interface Product {
  slug: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  // Oils & Condiments
  {
    slug: "olive-oil",
    title: "Olive Oil",
    shortDesc: "Extra virgin olive oil, cold pressed from Mediterranean olives",
    longDesc:
      "Our premium extra virgin olive oil is carefully cold-pressed from handpicked Mediterranean olives grown in sun-drenched groves. This artisanal process preserves the oil's rich nutritional profile, vibrant golden-green color, and distinctive fruity aroma with subtle peppery notes. Perfect for dressings, drizzling, and Mediterranean cuisine. Rich in antioxidants and healthy monounsaturated fats. Available in various packaging options to suit professional kitchens and retail markets.",
    category: "Oils & Condiments",
    image: "/products/olive-oil.jpg",
  },
  {
    slug: "pomegranate-molasses",
    title: "Pomegranate Molasses",
    shortDesc: "Natural and rich pomegranate molasses with no added sugar",
    longDesc:
      "Crafted from concentrated juice of premium pomegranates, our molasses delivers an authentic sweet-tart flavor profile essential to Middle Eastern and Mediterranean cooking. Made without added sugars or preservatives, each batch captures the natural complexity of sun-ripened pomegranates. This versatile ingredient enhances salad dressings, glazes for roasted meats, marinades, and traditional dishes like muhammara. Its deep burgundy color and syrupy consistency add both visual appeal and depth of flavor to modern and traditional recipes alike.",
    category: "Oils & Condiments",
    image: "/products/pomegranate-molasses.jpg",
  },

  // Pepper & Chili Products
  {
    slug: "pepper-paste",
    title: "Pepper Paste",
    shortDesc: "Sweet and spicy Mediterranean pepper paste",
    longDesc:
      "Our signature pepper paste combines sun-dried Mediterranean red peppers with a carefully balanced blend of spices. Slowly cooked to develop deep, complex flavors, this paste offers a perfect balance of natural sweetness and gentle heat. Ideal as a cooking base for stews, soups, and sauces, or as a flavorful spread. The traditional recipe has been perfected over generations, delivering consistent quality and authentic taste. Free from artificial colors and preservatives, it brings the essence of Mediterranean cuisine to your kitchen.",
    category: "Pepper & Chili Products",
    image: "/products/pepper-paste.jpg",
  },
  {
    slug: "harissa",
    title: "Harissa",
    shortDesc: "Spicy North African chili paste with aromatic spices",
    longDesc:
      "This fiery North African condiment features a masterful blend of red chili peppers, roasted garlic, cumin, coriander, and caraway seeds, all bound with premium olive oil. Our harissa delivers authentic heat with layers of complex, smoky flavor. Essential for tagines, couscous, and grilled meats, it also serves as an excellent marinade base or flavor enhancer for modern fusion cuisine. Each batch is prepared following traditional Tunisian methods, ensuring consistent heat levels and genuine taste. Perfect for professional kitchens seeking to add North African authenticity to their menus.",
    category: "Pepper & Chili Products",
    image: "/products/harissa.jpg",
  },
  {
    slug: "ajvar",
    title: "Ajvar",
    shortDesc: "Roasted red pepper and eggplant relish",
    longDesc:
      "A beloved Balkan specialty, our ajvar combines fire-roasted red peppers and eggplant with garlic and sunflower oil to create a rich, smoky spread. Each vegetable is carefully charred to develop deep, caramelized flavors before being blended to a smooth yet rustic texture. Traditionally served as a condiment with grilled meats and bread, ajvar also works beautifully as a pasta sauce, pizza topping, or sandwich spread. Our recipe honors centuries-old preparation methods while meeting modern food safety standards. Available in mild and spicy varieties to suit diverse palates.",
    category: "Pepper & Chili Products",
    image: "/products/ajvar.jpg",
  },
  {
    slug: "shatta",
    title: "Shatta",
    shortDesc: "Middle Eastern crushed chili sauce",
    longDesc:
      "Shatta is a vibrant, intensely flavored hot sauce that brings authentic Middle Eastern heat to any dish. Made from fresh green or red chilies, crushed with garlic, lemon juice, and olive oil, this condiment offers bright, clean heat without overpowering other flavors. Popular throughout the Levant region, shatta is the perfect accompaniment to shawarma, falafel, grilled meats, and mezze platters. Our version balances heat with acidity, making it versatile enough for both traditional and contemporary applications. Prepared in small batches to maintain peak freshness and flavor intensity.",
    category: "Pepper & Chili Products",
    image: "/products/shatta.jpg",
  },
  {
    slug: "lutenitsa",
    title: "Lutenitsa",
    shortDesc: "Bulgarian-style vegetable spread",
    longDesc:
      "This traditional Bulgarian spread captures the essence of summer vegetables preserved for year-round enjoyment. Our lutenitsa combines roasted red peppers, tomatoes, and eggplant, slow-cooked with carrots and onions until thick and jammy. The result is a versatile condiment with natural sweetness and subtle smokiness. Spread on crusty bread, served alongside cheese, or used as a cooking base for stews and casseroles, lutenitsa brings authentic Eastern European flavor to any table. Made from non-GMO vegetables and prepared without artificial additives, each jar delivers pure, wholesome taste.",
    category: "Pepper & Chili Products",
    image: "/products/lutenitsa.jpg",
  },

  // Coffee Products
  {
    slug: "whole-coffee-beans",
    title: "Whole Coffee Beans",
    shortDesc: "Premium roasted Arabica coffee beans",
    longDesc:
      "Our premium Arabica coffee beans are sourced from high-altitude plantations where cooler temperatures and rich volcanic soil produce beans with exceptional flavor complexity. Each batch is carefully roasted to a medium profile that highlights the beans' natural sweetness, bright acidity, and notes of chocolate and nuts. These whole beans are perfect for coffee enthusiasts and specialty cafes seeking consistent quality and distinctive character. Packaged immediately after roasting to preserve freshness and aromatic oils. Suitable for all brewing methods from espresso to French press.",
    category: "Coffee Products",
    image: "/products/whole-coffee-beans.jpg",
  },
  {
    slug: "ground-coffee",
    title: "Ground Coffee",
    shortDesc: "Finely ground coffee for rich aroma and taste",
    longDesc:
      "Expertly ground from premium Arabica beans, our coffee delivers convenience without compromising quality. The precise grind size ensures optimal extraction whether you're brewing espresso, drip coffee, or using traditional Middle Eastern methods. Each batch is ground immediately before packaging to preserve the coffee's aromatic compounds and essential oils. The result is a smooth, full-bodied cup with balanced acidity and a clean finish. Notes of dark chocolate, toasted nuts, and subtle fruit create a complex yet approachable flavor profile. Ideal for hotels, restaurants, and retail customers demanding consistent excellence.",
    category: "Coffee Products",
    image: "/products/ground-coffee.jpg",
  },

  // Ready-to-Use Sauces
  {
    slug: "pizza-sauces",
    title: "Pizza Sauces",
    shortDesc: "Authentic Italian-style pizza sauces",
    longDesc:
      "Our pizza sauces are crafted from vine-ripened tomatoes, hand-crushed and simmered with fresh basil, oregano, and garlic to create an authentic Italian base. The sauce maintains the perfect consistency – thick enough to stay on the dough without making it soggy, yet spreadable for even coverage. Each variety is balanced for acidity and sweetness, complementing rather than overpowering toppings. Available in classic marinara, spicy arrabbiata, and herb-infused variations. Ideal for pizzerias, Italian restaurants, and food service operations requiring consistent, high-quality results. No artificial preservatives or flavor enhancers.",
    category: "Ready-to-Use Sauces",
    image: "/products/pizza-sauce.jpg",
  },
  {
    slug: "pasta-sauces",
    title: "Pasta Sauces",
    shortDesc: "Traditional Italian pasta sauces",
    longDesc:
      "From classic marinara to rich Bolognese, our pasta sauce collection brings authentic Italian flavor to professional and home kitchens. Each sauce is prepared using time-honored recipes and premium ingredients – San Marzano-style tomatoes, extra virgin olive oil, fresh herbs, and carefully selected spices. Slow-simmered to develop deep, layered flavors, these sauces deliver restaurant-quality results with minimal preparation. Our range includes vegetarian options, meat-based sauces, and cream-based varieties, all designed to pair perfectly with different pasta shapes and cooking styles. Convenient for high-volume operations while maintaining artisanal quality.",
    category: "Ready-to-Use Sauces",
    image: "/products/pasta-sauce.jpg",
  },
  {
    slug: "doner-sauces",
    title: "Doner Sauces",
    shortDesc: "Signature sauces for doner and kebab dishes",
    longDesc:
      "Our doner sauce collection represents the authentic flavors found in the best kebab houses across Turkey and the Mediterranean. The range includes creamy garlic yogurt sauce with hints of dill and lemon, spicy tomato-based ezme with crushed peppers, and herb-infused green sauce with parsley and mint. Each sauce is formulated to complement grilled meats while adding moisture and flavor contrast. These sauces are essential for doner kebabs, shawarma, gyros, and other grilled meat applications. Prepared with natural ingredients and balanced seasoning, they enhance without overwhelming. Perfect for quick-service restaurants and food trucks.",
    category: "Ready-to-Use Sauces",
    image: "/products/doner-sauce.jpg",
  },

  // Asian Specialties
  {
    slug: "sambal",
    title: "Sambal",
    shortDesc: "Southeast Asian chili condiment",
    longDesc:
      "Our sambal delivers the bold, complex heat central to Indonesian and Malaysian cuisine. Made from crushed red chilies, shrimp paste, garlic, ginger, and palm sugar, this condiment offers layers of flavor beyond simple heat. The balance of spicy, savory, sweet, and umami makes sambal incredibly versatile – use it as a cooking ingredient, table condiment, or marinade base. Each batch is prepared according to traditional methods while maintaining consistent heat levels and flavor profiles. Essential for Asian fusion restaurants, noodle bars, and modern kitchens exploring Southeast Asian flavors. Available in varying heat intensities.",
    category: "Asian Specialties",
    image: "/products/sambal.jpg",
  },

  // Preserved Vegetables
  {
    slug: "roasted-red-pepper",
    title: "Roasted Red Peppers",
    shortDesc: "Fire-roasted red peppers in oil",
    longDesc:
      "Our roasted red peppers are fire-charred to develop deep, smoky sweetness, then carefully peeled and preserved in seasoned oil. The roasting process caramelizes the peppers' natural sugars while adding subtle char notes. Perfect for antipasti platters, salads, sandwiches, or as a pizza topping, these peppers deliver instant flavor and vibrant color. Each pepper is hand-selected for size and quality, ensuring consistent texture and taste. The preservation oil, infused with garlic and herbs, is excellent for dressing pasta or drizzling on grilled vegetables. A versatile ingredient that saves prep time while delivering superior results.",
    category: "Preserved Vegetables",
    image: "/products/roasted-red-pepper.jpg",
  },
  {
    slug: "roasted-aubergine",
    title: "Roasted Aubergine",
    shortDesc: "Smoky char-grilled aubergine slices",
    longDesc:
      "Thick-cut aubergine slices are char-grilled over open flame to achieve signature smokiness and tender texture. This traditional preparation method develops the eggplant's natural sweetness while adding complexity through carefully controlled charring. Preserved in olive oil with garlic and herbs, these aubergines are ready to use in countless applications – layered in vegetarian moussaka, blended into baba ghanoush, added to pasta dishes, or served as part of a mezze spread. The grilling eliminates bitterness while creating creamy interior texture. Ideal for Mediterranean restaurants and upscale food service operations.",
    category: "Preserved Vegetables",
    image: "/products/roasted-aubergine.jpg",
  },
  {
    slug: "pickles",
    title: "Mediterranean Pickles",
    shortDesc: "Assorted pickled vegetables in spiced brine",
    longDesc:
      "Our pickle assortment features cucumbers, peppers, cauliflower, and carrots preserved in a traditional spiced brine. Each vegetable is carefully selected at peak ripeness, ensuring optimal crunch and flavor absorption. The brine combines vinegar, salt, and a proprietary spice blend including dill, garlic, peppercorns, and bay leaves. The result is perfectly balanced acidity with aromatic complexity. These pickles serve as essential accompaniments to grilled meats, cheese platters, and sandwiches, while also providing a refreshing palate cleanser. Available in mixed jars or individual varieties. No artificial colors or preservatives – just honest, traditional pickling.",
    category: "Preserved Vegetables",
    image: "/products/pickles.jpg",
  },
  {
    slug: "preserved-vegetables",
    title: "Preserved Vegetables",
    shortDesc: "Seasonal Mediterranean vegetables preserved at peak freshness",
    longDesc:
      "Our preserved vegetable collection showcases the Mediterranean's seasonal bounty captured at peak ripeness. From sun-dried tomatoes and grilled zucchini to marinated artichoke hearts and caponata, each product represents traditional preservation methods refined for modern food service. These vegetables are processed immediately after harvest to lock in nutrients, color, and flavor. Prepared with minimal ingredients – typically just the vegetables, quality olive oil, vinegar, and select herbs – they offer clean, honest taste. Perfect for restaurants seeking consistent quality year-round, these preserved vegetables save prep time while delivering superior results compared to fresh out-of-season produce. Ideal for mezze platters, salads, pasta dishes, and antipasti.",
    category: "Preserved Vegetables",
    image: "/products/preserved-vegetables.jpg",
  },
];

export const categories = [
  "Oils & Condiments",
  "Pepper & Chili Products",
  "Coffee Products",
  "Ready-to-Use Sauces",
  "Asian Specialties",
  "Preserved Vegetables",
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
