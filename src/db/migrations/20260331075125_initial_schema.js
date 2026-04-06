/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function(table) {
      table.increments('id').primary();
      table.string('email').unique().notNullable();
      table.string('password_hash').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('journals', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.text('content');
      table.string('entry_type', 50).defaultTo('text'); // 'text' or 'voice'
      table.string('mood_label', 100);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('daily_moods', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('mood_score').notNullable(); // Scale e.g., 1 to 5
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('anonymous_rooms', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
      table.string('room_name', 100).notNullable(); // 'Lonely', 'Sad', 'Anxious', 'Stressed'
      table.text('message').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('anonymous_rooms')
    .dropTableIfExists('daily_moods')
    .dropTableIfExists('journals')
    .dropTableIfExists('users');
};
