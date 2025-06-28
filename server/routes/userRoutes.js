const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const { updateUserRole, getAllUsers } = require('../controllers/userController');
const validate = require('../middleware/validateMiddleware');
const { updateUserRoleSchema } = require('../utils/validate');


router.get('/', [authMiddleware, roleMiddleware(['Admin'])], getAllUsers);
router.put('/:id/role', [authMiddleware, roleMiddleware(['Admin']), validate(updateUserRoleSchema)], updateUserRole);

module.exports = router;
