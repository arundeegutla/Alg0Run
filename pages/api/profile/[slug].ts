import { NextApiRequest, NextApiResponse } from 'next';
import * as controller from '~/server/src/controllers/profile';


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
        case 'create': {
          const { idToken, username, photoURL } = body;

          if (!idToken || !username || !photoURL) {
            return res
              .status(400)
              .json({ error: 'idToken, username, and photoURL are required' });
          }

          const result = await controller.createProfile(
            idToken as string,
            username as string,
            photoURL as string
          );
          return res.status(200).json(result);
        }

        case 'get': {
          const { profileId } = body;

          if (!profileId) {
            return res.status(400).json({ error: 'profileId is required' });
          }

          const result = await controller.getProfile(profileId as string);
          return res.status(200).json(result);
        }

        case 'getByToken': {
          const { idToken } = body;

          if (!idToken) {
            return res.status(400).json({ error: 'idToken is required' });
          }

          const result = await controller.getProfileByToken(idToken as string);
          return res.status(200).json(result);
        }

        case 'isFirstTime': {
          const { idToken } = body;

          if (!idToken) {
            return res.status(400).json({ error: 'idToken is required' });
          }

          const result = await controller.isFirstTimeUser(idToken as string);
          return res.status(200).json(result);
        }

        case 'addFriend': {
          const { profileId, friendId } = body;

          if (!profileId || !friendId) {
            return res
              .status(400)
              .json({ error: 'profileId and friendId are required' });
          }

          const result = await controller.addFriend(
            profileId as string,
            friendId as string
          );
          return res.status(200).json(result);
        }

        case 'removeFriend': {
          const { profileId, friendId } = body;

          if (!profileId || !friendId) {
            return res
              .status(400)
              .json({ error: 'profileId and friendId are required' });
          }

          const result = await controller.removeFriend(
            profileId as string,
            friendId as string
          );
          return res.status(200).json(result);
        }

        default:
          return res
            .status(404)
            .json({ error: `Endpoint '${slug}' not found` });
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' + method });
    }
  } catch (error) {
    console.error(`Error in ${slug}:`, error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
