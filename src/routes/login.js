const express = require('express');

const router = express.Router();
const AuthController = require('../app/controllers/AuthController');

router.get('/', AuthController.signIn);

router.post('/', AuthController.handleSignIn);

module.exports = router;
