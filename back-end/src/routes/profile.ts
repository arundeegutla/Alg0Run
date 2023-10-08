import { Request, Response } from "express"

import * as controller from "../controllers/profile"
const router = require('express').Router()

router.post('/create', async (req: Request, res: Response) => {
  res.json(await controller.createProfile(req.body.idToken as string, req.body.username as string));
});
router.post('/get', async (req: Request, res: Response) => {
  res.json(await controller.getProfile(req.body.profileId as string));
});
router.post('/getByToken', async (req: Request, res: Response) => {
  res.json(await controller.getProfileByToken(req.body.idToken as string));
});
router.post('/isFirstTime', async (req: Request, res: Response) => {
  res.json(await controller.isFirstTimeUser(req.body.idToken as string));
});
router.post('/addFriend', async (req: Request, res: Response) => {
  res.json(await controller.addFriend(req.body.profileId as string, req.body.friendId as string));
});
router.post('/removeFriend', async (req: Request, res: Response) => {
  res.json(await controller.removeFriend(req.body.profileId as string, req.body.friendId as string));
});

module.exports = router;
