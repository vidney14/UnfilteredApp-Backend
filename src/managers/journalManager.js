const db = require('../config/db'); // knex instance

exports.createEntry = async (journalData) => {
  const { user_id, content, entry_type, mood_label } = journalData;

  const [newJournal] = await db('journals')
    .insert({
      user_id,
      content,
      entry_type: entry_type || 'text',
      mood_label
    })
    .returning('*');

  return newJournal;
};

exports.getEntriesByUser = async (user_id) => {
  const journals = await db('journals')
    .where({ user_id })
    .orderBy('created_at', 'desc');

  return journals;
};
