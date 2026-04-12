const moodManager = require('../managers/moodManager');

exports.logMood = async (req, res) => {
  try {
    const { modeType, modeSubType } = req.body;
    const userId = req.user.id;

    if (!modeType || !modeSubType) {
      return res.status(400).json({ error: 'modeType and modeSubType are required' });
    }

    const newLog = await moodManager.logMood(userId, modeType, modeSubType);
    res.status(201).json(newLog);
  } catch (error) {
    console.error('Error logging mood:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user.id;
    const days = parseInt(req.query.days) || 7;

    const analytics = await moodManager.getAnalytics(userId, days);
    res.status(200).json(analytics);
  } catch (error) {
    console.error('Error fetching mood analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
