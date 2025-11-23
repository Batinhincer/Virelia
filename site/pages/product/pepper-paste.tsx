export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <img
          src="/pepper-paste.jpg"
          alt="Pepper Paste"
          className="w-full max-w-md mx-auto mb-8 rounded-lg shadow"
        />
        <h1 className="text-4xl font-bold mb-4">Pepper Paste</h1>
        <p className="text-lg leading-relaxed">
          Our pepper paste is crafted using sun-ripened Mediterranean red peppers. Carefully ground and slowly cooked,
          it brings out the natural sweetness and vibrant flavor, perfect for sauces, dips, and traditional recipes.
        </p>
      </div>
    </div>
  );
}
