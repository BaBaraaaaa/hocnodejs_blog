const express = require('express');

const router = express.Router();

const courseController = require('../app/controllers/CoursesControllers');
// CoursesControllers.index;



router.post('/createItem', courseController.createItem);
router.put('/:id/restore', courseController.restoreItem);
router.put('/:id', courseController.updateItem);
router.get('/create', courseController.create);
router.delete('/:id', courseController.deleteItem);
router.get('/:id/edit', courseController.editItem);
router.get('/:slug', courseController.show);
router.delete('/:id/delete-bulk',courseController.deleteOne);
router.post('/delete-bulk',courseController.deleteBulk);

module.exports = router;
