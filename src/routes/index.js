const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const journalRoutes = require('./journalRoutes');
const moodRoutes = require('./moodRoutes');
const journalEntryRoutes = require('./journalEntryRoutes');
const chatRoutes = require('./chatRoutes');

// Mount all feature routes here
router.use('/auth', authRoutes);
router.use('/journals', journalRoutes);
router.use('/mood', moodRoutes);
router.use('/journal', journalEntryRoutes);
router.use('/rooms', chatRoutes);

module.exports = router;
