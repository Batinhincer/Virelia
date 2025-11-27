import type { NextApiRequest, NextApiResponse } from 'next';
import packageJson from '../../package.json';

interface VersionResponse {
  version: string;
  commit?: string;
  buildTime?: string;
}

/**
 * Version endpoint for build and deployment information.
 *
 * Returns:
 * - version: Application version from package.json
 * - commit: Short Git commit hash (if available via VERCEL_GIT_COMMIT_SHA or GIT_COMMIT)
 * - buildTime: Build timestamp (if available via BUILD_TIME)
 *
 * @example
 * GET /api/version
 * Response: { "version": "1.0.0", "commit": "abc1234", "buildTime": "2025-01-01T12:00:00.000Z" }
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<VersionResponse>
) {
  // Get commit hash from various possible environment variables
  const commitSha =
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.GIT_COMMIT ||
    process.env.COMMIT_SHA ||
    '';

  // Shorten to first 7 characters if available
  const shortCommit = commitSha ? commitSha.substring(0, 7) : undefined;

  const response: VersionResponse = {
    version: packageJson.version,
  };

  // Only include optional fields if they have values
  if (shortCommit) {
    response.commit = shortCommit;
  }

  if (process.env.BUILD_TIME) {
    response.buildTime = process.env.BUILD_TIME;
  }

  res.status(200).json(response);
}
