/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('rooms', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('mood_tag').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('messages', function(table) {
      table.increments('id').primary();
      table.integer('room_id').unsigned().notNullable()
        .references('id').inTable('rooms').onDelete('CASCADE');
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.text('content').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('messages')
    .dropTableIfExists('rooms');
};
