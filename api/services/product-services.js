const { sequelize } = require('../../models');
const { QueryTypes } = require('sequelize');
const { logger } = require("../helpers/logger");
var uuid = require('node-uuid');
const createProduct = async (name,price,quantity) => {
    let query = `insert into products(id,name,price,quantity) values(?,?,?,?) `
    let bindParams = [uuid.v4(), name,price,quantity]
    await sequelize.query(query, { replacements: bindParams, type: QueryTypes.INSERT });
};

const getAllProduct = async (offset,limit) => {
    let query = `select * from products  limit ${limit} offset ${offset} `
    let bindParams = []
    return await sequelize.query(query, { replacements: bindParams, type: QueryTypes.SELECT });
};

const getProduct = async (id) => {
    let query = `select * from products  where id = ? `
    let bindParams = [id]
    let product = await sequelize.query(query, { replacements: bindParams, type: QueryTypes.SELECT });
    return product[0]
};
const deleteProduct = async (id) => {
    let query = `delete from products  where id = ? `
    let bindParams = [id]
    return await sequelize.query(query, { replacements: bindParams, type: QueryTypes.DELETE });
};

const updateProduct = async (name,price,quantity,id) => {
    let query = `update products  set name=?,price=?,quantity=? where id = ? `
    let bindParams = [name,price,quantity,id]
    return await sequelize.query(query, { replacements: bindParams, type: QueryTypes.UPDATE });
};

const getUserProduct = async(user_id,product_id) =>{
    let query = ` select * from bookings where user_id = ? and product_id = ? `;
    let bindParams =[user_id,product_id];
    let userProduct = await sequelize.query(query,{ replacements: bindParams, type: QueryTypes.SELECT });
    return userProduct[0];
}

const bookProduct = async(user_id,product_id,quantity) =>{
    let id = uuid();
    let query = ` insert into bookings(id,user_id,product_id,quantity,created_at,updated_at) values(?,?,?,?,?,?) `;
    let bindParams =[id,user_id,product_id,quantity,new Date(),new Date()];
    await sequelize.query(query,{ replacements: bindParams, type: QueryTypes.INSERT });
}
const cancelProduct = async(product_id,user_id) =>{
    let query = ` delete from bookings where user_id = ? and product_id = ? `;
    let bindParams =[user_id,product_id];
    let userProduct = await sequelize.query(query,{ replacements: bindParams, type: QueryTypes.DELETEp });
    return userProduct[0];
}
module.exports = {
    createProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getUserProduct,
    bookProduct,
    cancelProduct
}