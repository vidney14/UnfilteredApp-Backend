const db = require('../config/db');

exports.logMood = async (userId, modeType, modeSubType) => {
  const [newLog] = await db('mood_logs')
    .insert({
      user_id: userId,
      mode_type: modeType,
      mode_sub_type: modeSubType
    })
    .returning('*');
  
  return newLog;
};

exports.getAnalytics = async (userId, days = 7) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  // 1. Total logs in period
  const totalLogsResult = await db('mood_logs')
    .where('user_id', userId)
    .where('created_at', '>=', startDate)
    .count('id as count')
    .first();
  
  const totalLogs = parseInt(totalLogsResult.count);

  // 2. Mood counts aggregated per mode_type
  const moodCounts = await db('mood_logs')
    .where('user_id', userId)
    .where('created_at', '>=', startDate)
    .select('mode_type as modeType')
    .count('id as count')
    .groupBy('mode_type');

  // Convert count to number
  const formattedMoodCounts = moodCounts.map(item => ({
    modeType: item.modeType,
    count: parseInt(item.count)
  }));

  // 3. Daily logs (recent entries)
  const dailyLogs = await db('mood_logs')
    .where('user_id', userId)
    .where('created_at', '>=', startDate)
    .select('created_at as date', 'mode_type as modeType', 'mode_sub_type as modeSubType')
    .orderBy('created_at', 'desc');

  return {
    totalLogs,
    moodCounts: formattedMoodCounts,
    dailyLogs
  };
};
