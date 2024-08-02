const express = require('express');

const router = express.Router();
const authenticateToken = require('../app/middlewares/auth');
const newsController = require('../app/controllers/NewsControllers');
const isPrivate = require('../app/middlewares/isPrivate');
// newsController.index;

router.use('/:slug', newsController.show);

router.use('/',isPrivate,authenticateToken, newsController.index);

module.exports = router;
