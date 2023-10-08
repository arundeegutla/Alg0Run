import { Request, Response } from "express"

import * as controller from "../controllers/profile"
const router = require('express').Router()

router.get('/create', async (req: Request, res: Response) => {
  res.json(await controller.createProfile(req.body.idToken as string, req.body.username as string));
});
router.get('/get', async (req: Request, res: Response) => {
  res.json(await controller.getProfile(req.body.profileId as string));
});
router.get('/getByToken', async (req: Request, res: Response) => {
  res.json(await controller.getProfileByToken(req.body.idToken as string));
});
router.get('/isFirstTime', async (req: Request, res: Response) => {
  res.json(await controller.isFirstTimeUser(req.body.idToken as string));
});
router.get('/addFriend', async (req: Request, res: Response) => {
  res.json(await controller.addFriend(req.body.profileId as string, req.body.friendId as string));
});
router.get('/removeFriend', async (req: Request, res: Response) => {
  res.json(await controller.removeFriend(req.body.profileId as string, req.body.friendId as string));
});

module.exports = router;
