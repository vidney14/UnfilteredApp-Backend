const journalEntryManager = require('../managers/journalEntryManager');

exports.createEntry = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const newEntry = await journalEntryManager.createEntry(userId, content);
    res.status(201).json(newEntry);
  } catch (err) {
    console.error('Create Journal Entry Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const userId = req.user.id;
    const entries = await journalEntryManager.getEntriesByUser(userId);
    res.status(200).json(entries);
  } catch (err) {
    console.error('Get Journal Entries Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
