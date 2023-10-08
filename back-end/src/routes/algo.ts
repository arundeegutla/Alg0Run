import { Request, Response } from "express"

import * as controller from "../controllers/algo"
import { PlayDetails } from "../util/models"
const router = require('express').Router()

router.post('/createPlay', async (req: Request, res: Response) => {
  res.json(await controller.createPlay(req.body.algoId as string, req.body.profileId as string, req.body.playDetails as PlayDetails))
});

router.post('/get', async (req: Request, res: Response) => {
  res.json(await controller.getAlgo(req.body.algoId as string))
});

router.post('/all', async (req: Request, res: Response) => {
  res.json(await controller.getAllAlgos())
});

module.exports = router;