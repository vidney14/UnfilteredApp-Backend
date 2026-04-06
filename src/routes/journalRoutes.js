const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const authMiddleware = require('../middlewares/auth');

// All journal routes require authentication
router.use(authMiddleware);

// @route   POST api/journals
// @desc    Create a new journal entry
router.post('/', journalController.createJournal);

// @route   GET api/journals
// @desc    Get all journal entries for the logged in user
router.get('/', journalController.getJournals);

module.exports = router;
