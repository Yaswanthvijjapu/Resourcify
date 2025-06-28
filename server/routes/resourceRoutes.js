const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createResourceSchema, updateResourceSchema } = require('../utils/resourceValidate');
const { createResource, getResources, getResourceById, updateResource, deleteResource } = require('../controllers/resourceController');

router.post('/', [authMiddleware, roleMiddleware(['Admin']), validate(createResourceSchema)], createResource);
router.get('/', [authMiddleware], getResources);
router.get('/:id', [authMiddleware], getResourceById);
router.put('/:id', [authMiddleware, roleMiddleware(['Admin']), validate(updateResourceSchema)], updateResource);
router.delete('/:id', [authMiddleware, roleMiddleware(['Admin'])], deleteResource);

module.exports = router;