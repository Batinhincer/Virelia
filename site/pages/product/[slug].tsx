import { useRouter } from "next/router";
// Updated product catalogue includes more items
import Head from "next/head";

const products = {
  "olive-oil": {
    title: "Olive Oil",
    desc: "Extra virgin olive oil, cold pressed.",
    image: "/olive-oil.jpg",
    content: "Our premium olive oil is carefully cold-pressed from the finest Mediterranean olives...",
  },
  "pomegranate-molasses": {
    title: "Pomegranate Molasses",
    desc: "Natural and rich pomegranate molasses.",
    image: "/pomegranate.jpg",
    content: "Made from concentrated pomegranate juice without added sugar or additives...",
  },
  "pepper-paste": {
    title: "Pepper Paste",
    desc: "Sweet and spicy Mediterranean pepper paste.",
    image: "/pepper-paste.jpg",
    content: "Rich in flavor, our pepper paste is crafted using sun-dried Mediterranean peppers...",
  },
  "coffee-beans": {
    title: "Whole Coffee Beans",
    desc: "Premium roasted Arabica coffee beans.",
    image: "/coffee-beans.jpg",
    content: "Our Arabica beans are expertly roasted to provide a bold and aromatic experience...",
  },
  "ground-coffee": {
    title: "Ground Coffee",
    desc: "Finely ground coffee for rich aroma and taste.",
    image: "/ground-coffee.jpg",
    content: "Perfectly ground for filter or espresso, delivering rich flavor in every cup...",
  },

  // Additional products beyond the core coffee and oils
  "ajvar": {
    title: "Ajvar",
    desc: "Roasted pepper and eggplant relish.",
    image: "/hero1.jpg",
    content: "Our ajvar combines roasted red peppers and eggplant, blended with garlic and spices for a rich, smoky flavor. It's perfect as a spread, dip or side dish in Mediterranean cuisine.",
  },
  "lutenitsa": {
    title: "Lutenitsa",
    desc: "Bulgarian-style vegetable spread.",
    image: "/hero1.jpg",
    content: "Lutenitsa is a traditional Bulgarian spread made from roasted peppers, tomatoes and eggplant, simmered until thick and flavourful. It pairs wonderfully with bread, cheese or grilled meats.",
  },
  "harissa": {
    title: "Harissa",
    desc: "Spicy North African chili paste.",
    image: "/hero1.jpg",
    content: "This fiery chili paste features a blend of hot peppers, garlic, spices and olive oil. Use it to add heat and depth to stews, marinades or sandwiches.",
  },
  "shatta": {
    title: "Shatta",
    desc: "Middle Eastern crushed chili sauce.",
    image: "/hero1.jpg",
    content: "Shatta is a vibrant hot sauce made from fresh red or green chilies, olive oil, garlic and lemon juice. It adds a punch of flavour to kebabs, falafel and shawarma.",
  },
  "sambal": {
    title: "Sambal",
    desc: "South-East Asian chili condiment.",
    image: "/hero1.jpg",
    content: "Our sambal is a bold chili sauce featuring crushed chilies, vinegar and spices. It's an essential condiment for noodles, rice dishes and grilled meats.",
  },
  "doner-sauces": {
    title: "Doner Sauces",
    desc: "Signature sauces for doner and kebab dishes.",
    image: "/hero1.jpg",
    content: "A collection of savoury sauces crafted to complement doner and kebab dishes, including garlic yoghurt, spicy tomato and herb-infused blends.",
  },
  "pizza-sauces": {
    title: "Pizza Sauces",
    desc: "Ready-to-use pizza sauces.",
    image: "/hero1.jpg",
    content: "Our pizza sauces are simmered from ripe tomatoes, herbs and spices, providing a rich base for authentic Italian-style pizzas.",
  },
  "pasta-sauces": {
    title: "Pasta Sauces",
    desc: "Traditional Italian pasta sauces.",
    image: "/hero1.jpg",
    content: "Choose from a variety of pasta sauces, from classic marinara to creamy Alfredo, all crafted with premium ingredients for a genuine taste of Italy.",
  },
  "roasted-red-pepper": {
    title: "Roasted Red Pepper",
    desc: "Fire-roasted red peppers.",
    image: "/hero1.jpg",
    content: "Our roasted red peppers are peeled, fire-roasted and preserved in oil, ready to use in salads, pastas or antipasti platters.",
  },
  "roasted-aubergine": {
    title: "Roasted Aubergine",
    desc: "Smoky roasted aubergine slices.",
    image: "/hero1.jpg",
    content: "These slices of aubergine are char-grilled to bring out their smoky sweetness. Perfect as a side, in dips or layered in casseroles.",
  },
  "pickles": {
    title: "Pickles",
    desc: "Assorted Mediterranean pickles.",
    image: "/hero1.jpg",
    content: "A tangy mix of cucumbers, peppers and other vegetables pickled in a spiced brine. Ideal for meze platters or as a palate-cleansing side.",
  },
  "preserved-vegetables": {
    title: "Preserved Vegetables",
    desc: "A variety of preserved vegetables.",
    image: "/hero1.jpg",
    content: "Our preserved vegetables collection offers seasonal Mediterranean produce preserved at peak ripeness, ready to enhance any meal with authentic flavours.",
  },
};

export default function ProductPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug || typeof slug !== "string") return null;

  const product = products[slug];

  if (!product) {
    return <div className="p-10 text-center text-xl">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        <title>{product.title} | Virelia</title>
        <meta name="description" content={product.desc} />
      </Head>

      <div className="max-w-4xl mx-auto py-16 px-4">
        <img src={product.image} alt={product.title} className="w-full h-80 object-cover rounded-xl mb-8" />
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-lg mb-6">{product.desc}</p>
        <p className="text-base leading-relaxed">{product.content}</p>
      </div>
    </div>
  );
}
