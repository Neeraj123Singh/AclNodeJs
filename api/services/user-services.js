
const { sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const { logger } = require("../helpers/logger");
var uuid = require('node-uuid');
const signUp = async (data) => {
    let query = `insert into users(id,email,name,role,password,created_at,updated_at) values(?,?,?,?,?,now(),now()) `
    let bindParams = [uuid.v4(), data.email, data.name, data.role,  data.password]
    await sequelize.query(query, { replacements: bindParams, type: QueryTypes.INSERT });
    query = `select u.id as id , u.email as email,u.name as name  from users u where email = ?`;
    bindParams = [data.email];
    let user = await sequelize.query(query, { replacements: bindParams, type: QueryTypes.SELECT });
    return user[0];
};

const findUser = async (email) => {
    try {
        
        let query = ' SELECT u.name as name , u.password as password,u.email as email,r.name as role from users  u left join roles r on u.role = r.id  where u.email=?';
        let bindParams = [email];
        let user = await sequelize.query(query, { replacements: bindParams, type: QueryTypes.SELECT });
        return user[0];
    } catch (error) {
        console.log(error)
        logger.info(error)
    }
}

const findRole = async (role) => {
    let query = `select  r.id as id, r.name as role from roles r where name = ?`;
    let bindParams = [role];
    let foundRole = await sequelize.query(query, { replacements: bindParams, type: QueryTypes.SELECT });
    return foundRole[0];

}
module.exports = {
    signUp,
    findRole,
    findUser
}