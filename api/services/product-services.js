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
    return await sequelize.query(query, { replacements: bindParams, type: QueryTypes.SELECT });
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
module.exports = {
    createProduct,
    getAllProduct,
    getProduct,
    deleteProduct,
    updateProduct
}