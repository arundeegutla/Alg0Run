import { Request, Response } from "express"

import * as controller from "../controllers/leaderboard"
const router = require('express').Router()

router.get('/algo', async (req: Request, res: Response) => {
  res.json(await controller.getAlgoLeaderboard(req.body.algoId as string));
});

router.get('/users', async (req: Request, res: Response) => {
  res.json(await controller.getUserLeaderboard());
});

module.exports = router;