const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const journalRoutes = require('./journalRoutes');

// Mount all feature routes here
router.use('/auth', authRoutes);
router.use('/journals', journalRoutes);

module.exports = router;
