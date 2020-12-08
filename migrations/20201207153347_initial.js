exports.up = async (knex) => {
    await knex.schema.createTable('hit_counter', (table) => {
        table.increments();
        table.string('site', 250).unique().notNullable();
        table.integer('count').notNullable().defaultTo(0);
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTableIfExists('hit_counter');
};
