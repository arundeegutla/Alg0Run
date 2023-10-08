
import * as controller from "../controllers/algo"
const router = require('express').Router()

module.exports = () => {
  router.get('/createPlay', controller.createPlay)
  router.get('/get', controller.getAlgo)
  router.post('/all', controller.getAllAlgos)
}