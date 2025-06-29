const express = require('express');
const router = express.Router();
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const {
  getResourceUtilization,
  getMostUsedResources,
  getIdleTimes,
  exportUtilizationReport,
} = require('../controllers/analyticsController');

router.get('/utilization', [authMiddleware, roleMiddleware(['Admin', 'Manager'])], getResourceUtilization);
router.get('/most-used', [authMiddleware, roleMiddleware(['Admin', 'Manager'])], getMostUsedResources);
router.get('/idle-times', [authMiddleware, roleMiddleware(['Admin', 'Manager'])], getIdleTimes);
router.get('/export-utilization', [authMiddleware, roleMiddleware(['Admin', 'Manager'])], exportUtilizationReport);

module.exports = router;