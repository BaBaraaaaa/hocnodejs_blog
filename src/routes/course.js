const express = require('express');

const router = express.Router();

const courseController = require('../app/controllers/CoursesControllers');
// CoursesControllers.index;



router.post('/createItem', courseController.createItem);
router.put('/:id', courseController.updateItem);
router.get('/create', courseController.create);

router.get('/:id/edit', courseController.editItem);
router.get('/:slug', courseController.show);


module.exports = router;
