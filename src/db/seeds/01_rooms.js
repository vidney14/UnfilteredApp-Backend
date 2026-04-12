/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('rooms').del();
  await knex('rooms').insert([
    { name: 'The Healing Space', mood_tag: 'calm' },
    { name: 'High Energy Hub', mood_tag: 'energetic' },
    { name: 'Deep Reflection', mood_tag: 'thoughtful' },
    { name: 'Pure Joy Room', mood_tag: 'happy' },
    { name: 'The Vent Zone', mood_tag: 'frustrated' },
    { name: 'Quiet Support', mood_tag: 'sad' }
  ]);
};
