const express = require('express');
const router = express.Router();
const journalEntryController = require('../controllers/journalEntryController');
const authMiddleware = require('../middlewares/auth');

// All routes are JWT protected
router.use(authMiddleware);

// Path: /api/journal/entries
router.post('/entries', journalEntryController.createEntry);
router.get('/entries', journalEntryController.getEntries);

module.exports = router;
