const express = require('express');

const router = express.Router();
const AuthController = require('../app/controllers/AuthController');

router.get('/', AuthController.register);

router.post('/', AuthController.handleResgister);

module.exports = router;
