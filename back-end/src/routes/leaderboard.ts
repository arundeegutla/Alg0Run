import * as controller from "../controllers/leaderboard"
const router = require('express').Router()

module.exports = () => {
  router.get('/algo', controller.getAlgoLeaderboard)
  router.get('/users', controller.getUserLeaderboard)
}