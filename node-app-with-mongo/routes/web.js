const express = require('express');
const router = express.Router();

let Auth = require('../controllers/AuthController')

router.post('/auth/signup', Auth.signup)
router.post('/auth/signin', Auth.signin)
router.post('/auth/signout', Auth.signout)

router.get('/user', Auth.users)
router.get('/all', Auth.users)


module.exports = router;