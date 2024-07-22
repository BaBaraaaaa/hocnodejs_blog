const express = require('express');

const router = express.Router();

const meController = require('../app/controllers/MeControllers');
// CoursesControllers.index;



router.get('/stored/courses', meController.show);

module.exports = router;
