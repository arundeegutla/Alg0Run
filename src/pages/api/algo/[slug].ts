import { firestore } from 'firebase-admin';
import * as controller from '@/server/trpc/src/controllers/algo';
import { PlayDetails } from '@/server/trpc/util/models';
import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success?: boolean;
  error?: string;
  [key: string]: any; // To allow dynamic response properties
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { slug } = req.query; // Get the dynamic slug from the route
  const { method, body } = req;

  try {
    if (method === 'POST') {
      switch (slug) {
        case 'createPlay': {
          const { algoId, profileId, playDetails } = body;

          // Type assertion for PlayDetails
          const details: PlayDetails = {
            ...playDetails,
            date_completed: firestore.Timestamp.fromMillis(
              playDetails.date_completed
            ),
          };

          const result = await controller.createPlay(
            algoId,
            profileId,
            details
          );
          return res.status(200).json(result);
        }

        case 'get': {
          const { algoId } = body;
          const result = await controller.getAlgo(algoId);
          return res.status(200).json(result);
        }

        case 'all': {
          const result = await controller.getAllAlgos();
          return res.status(200).json(result);
        }

        default:
          return res.status(404).json({ error: 'Endpoint not found ' + slug });
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' + method });
    }
  } catch (error) {
    console.error(`Error in ${slug}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
