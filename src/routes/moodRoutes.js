const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');
const authMiddleware = require('../middlewares/auth');

// All mood routes are protected
router.use(authMiddleware);

router.post('/log', moodController.logMood);
router.get('/analytics', moodController.getAnalytics);

module.exports = router;
