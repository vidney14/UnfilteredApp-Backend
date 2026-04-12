const db = require('../config/db');

exports.createEntry = async (userId, content) => {
  const [newEntry] = await db('journal_entries')
    .insert({
      user_id: userId,
      content
    })
    .returning('*');
  
  return newEntry;
};

exports.getEntriesByUser = async (userId) => {
  const entries = await db('journal_entries')
    .where('user_id', userId)
    .orderBy('created_at', 'desc')
    .select('id', 'content', 'created_at');
  
  return entries;
};
