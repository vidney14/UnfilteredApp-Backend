const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middlewares/auth');

// Protected routes
router.use(authMiddleware);

router.get('/', chatController.getRooms);
router.get('/:id/messages', chatController.getRoomMessages);

module.exports = router;
