const express = require('express');

const router = express.Router();

const courseController = require('../app/controllers/CoursesControllers');
// CoursesControllers.index;



router.post('/createItem', courseController.createItem);

router.get('/create', courseController.create);

router.get('/:slug', courseController.show);


module.exports = router;
