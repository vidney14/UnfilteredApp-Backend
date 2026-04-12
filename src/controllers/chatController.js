const chatManager = require('../managers/chatManager');

exports.getRooms = async (req, res) => {
  try {
    const rooms = await chatManager.getRooms();
    res.status(200).json(rooms);
  } catch (err) {
    console.error('Get Rooms Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getRoomMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const messages = await chatManager.getRoomMessages(id);
    // User expects last 50, but usually clients want them in chronological order for display
    res.status(200).json(messages.reverse());
  } catch (err) {
    console.error('Get Messages Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
