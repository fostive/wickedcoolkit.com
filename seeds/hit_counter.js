exports.seed = async (knex) => {
    await knex('hit_counter').del();
    await knex('hit_counter').insert([{ site: 'localhost', count: 100 }]);
};
