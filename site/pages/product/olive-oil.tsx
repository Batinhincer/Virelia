import Link from "next/link";

export default function OliveOilPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <span className="text-green-700 hover:underline mb-6 inline-block">&larr; Back to Home</span>
        </Link>
        <h1 className="text-4xl font-bold mb-4">Olive Oil</h1>
        <img src="/olive-oil.jpg" alt="Olive Oil" className="w-full h-64 object-cover rounded-lg mb-6" />
        <p className="text-lg mb-4">
          Our extra virgin olive oil is cold-pressed from handpicked Mediterranean olives. It retains all the nutritional richness and vibrant flavor you'd expect from premium quality oil.
        </p>
        <p className="text-lg mb-4">
          Ideal for salads, cooking, and gourmet dishes. Rich in antioxidants and healthy fats.
        </p>
        <ul className="list-disc list-inside text-lg">
          <li>Origin: Mediterranean Region</li>
          <li>Cold Pressed</li>
          <li>Packaging: Glass bottles / Tin cans</li>
          <li>Available in: 250ml, 500ml, 1L, 5L</li>
        </ul>
      </div>
    </div>
  );
}
