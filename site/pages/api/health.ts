import type { NextApiRequest, NextApiResponse } from 'next';

interface HealthResponse {
  status: 'ok';
  environment: string;
  timestamp: string;
}

/**
 * Health check endpoint for monitoring and uptime checks.
 *
 * Returns:
 * - status: 'ok' if the service is healthy
 * - environment: Current NODE_ENV value
 * - timestamp: Current ISO 8601 timestamp
 *
 * @example
 * GET /api/health
 * Response: { "status": "ok", "environment": "production", "timestamp": "2025-01-01T12:00:00.000Z" }
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<HealthResponse>
) {
  const response: HealthResponse = {
    status: 'ok',
    environment: process.env.NODE_ENV || 'unknown',
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(response);
}
