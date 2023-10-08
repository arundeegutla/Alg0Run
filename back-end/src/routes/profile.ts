import * as controller from "../controllers/profile"
const router = require('express').Router()

module.exports = () => {
  router.get('/create', controller.createProfile)
  router.get('/get', controller.getProfile)
  router.get('/getByToken', controller.getProfileByToken)
  router.get('/isFirstTime', controller.isFirstTimeUser)
  router.get('/addFriend', controller.addFriend)
  router.get('/removeFriend', controller.removeFriend)
}