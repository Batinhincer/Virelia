export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <img
          src="/coffee-beans.jpg"
          alt="Whole Coffee Beans"
          className="w-full max-w-md mx-auto mb-8 rounded-lg shadow"
        />
        <h1 className="text-4xl font-bold mb-4">Whole Coffee Beans</h1>
        <p className="text-lg leading-relaxed">
          Our premium Arabica whole coffee beans are sourced from high-altitude plantations, ensuring a rich and full-bodied flavor. Carefully roasted for optimal aroma and depth, perfect for coffee connoisseurs.
        </p>
      </div>
    </div>
  );
}
