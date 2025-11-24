'use client';
/* Note: 'use client' is added for next-sanity/studio which uses React Server Component patterns internally */

import { NextStudio } from 'next-sanity/studio';
import config from '../sanity/sanity.config';

export default function AdminPage() {
  // Only render Sanity Studio if project ID is configured
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  
  if (!projectId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sanity Studio Not Configured</h1>
          <p className="text-gray-600 mb-4">
            To enable the CMS, please set the following environment variables:
          </p>
          <ul className="text-left text-sm text-gray-500 space-y-2">
            <li>• NEXT_PUBLIC_SANITY_PROJECT_ID</li>
            <li>• NEXT_PUBLIC_SANITY_DATASET</li>
            <li>• SANITY_API_VERSION (optional)</li>
          </ul>
        </div>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
