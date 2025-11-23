export default function ProductPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <img
          src="/ground-coffee.jpg"
          alt="Ground Coffee"
          className="w-full max-w-md mx-auto mb-8 rounded-lg shadow"
        />
        <h1 className="text-4xl font-bold mb-4">Ground Coffee</h1>
        <p className="text-lg leading-relaxed">
          Our finely ground Arabica coffee is meticulously prepared for a smooth, aromatic experience. Ideal for drip brewing, espresso, or traditional methods, delivering consistent quality in every cup.
        </p>
      </div>
    </div>
  );
}
