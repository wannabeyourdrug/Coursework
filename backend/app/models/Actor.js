const db = require('../components/db');

module.exports = {
    create: async (firstname, lastname, middlename, rank, experience) => {
        let res = await db.query(`
            insert into actors (
                firstname,
                lastname,
                middlename,
                rank,
                experience
            ) values (
                $1, $2, $3, $4, $5
            ) returning actor_id
        `, [
            firstname,
            lastname,
            middlename,
            rank,
            experience
        ]);
        if (res.rows && res.rows[0] && (res = res.rows[0])) return res.actor_id;
        else return null;
    },

    getById: async (actor_id) => {
        let actor = (await db.query(`select * from actors where actor_id = $1 limit 1`, [actor_id])).rows[0];
        return actor;
    },

    getAll: async () => {
        let result = (await db.query(`select * from actors where actor_id > 0 order by actor_id desc`)).rows;
        return result;
    },

    getList: async () => {
        let result = (await db.query(`select actor_id, firstname, lastname from actors where actor_id > 0 order by actor_id desc`)).rows;
        return result;
    },

    remove: async (actor_id) => {
        await db.query(`delete from actors where actor_id = $1`, [ actor_id ]);
    }
};