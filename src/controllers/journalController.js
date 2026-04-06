const journalManager = require('../managers/journalManager');

exports.createJournal = async (req, res) => {
  try {
    const { content, entry_type, mood_label } = req.body;
    const user_id = req.user.id;

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    const newJournal = await journalManager.createEntry({
      user_id,
      content,
      entry_type,
      mood_label
    });

    res.status(201).json(newJournal);
  } catch (err) {
    console.error('Create Journal Error:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getJournals = async (req, res) => {
  try {
    const user_id = req.user.id;
    const journals = await journalManager.getEntriesByUser(user_id);
    res.status(200).json(journals);
  } catch (err) {
    console.error('Get Journals Error:', err.message);
    res.status(500).send('Server error');
  }
};
