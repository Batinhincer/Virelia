import Link from 'next/link';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Sanity Studio</h1>
        <p className="text-gray-600 mb-6">
          Sanity Studio is deployed separately at:
        </p>
        <a
          href="https://studio.frezya.nl"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mb-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://studio.frezya.nl
        </a>
        <p className="text-sm text-gray-500 mt-4">
          The Studio is deployed as a standalone application for better performance and security.
        </p>
        <Link href="/" className="block mt-6 text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
