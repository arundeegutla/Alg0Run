import { NextApiRequest, NextApiResponse } from 'next';
import * as controller from '~/server/src/controllers/leaderboard';

type Data = {
  success?: boolean;
  error?: string;
  [key: string]: any; // Allow additional dynamic properties in the response
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query; // Get the dynamic slug from the route
  const { method, body } = req;

  try {
    if (method === 'POST') {
      switch (slug) {
        case 'algo': {
          const { algoId } = body;
          if (!algoId) {
            return res.status(400).json({ error: 'algoId is required' });
          }

          const result = await controller.getAlgoLeaderboard(algoId as string);
          return res.status(200).json(result);
        }

        case 'users': {
          const result = await controller.getUserLeaderboard();
          return res.status(200).json(result);
        }

        default:
          return res.status(404).json({ error: 'Endpoint not found' });
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' + method });
    }
  } catch (error) {
    console.error(`Error in ${slug}:`, error);

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
