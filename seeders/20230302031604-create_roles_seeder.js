'use strict';
var uuid = require('uuid');
const {sequelize} = require('../models');
const { QueryTypes } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [
      {
       id:uuid.v4(),
       role: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
      },
      {
        id:uuid.v4(),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    for(let i=0;i<data.length;i++){
      let query = ` insert into roles(id,name,created_at,updated_at) values (?,?,?,?)`;
      let bindParams = [data[i].id,data[i].role,data[i].createdAt,data[i].updatedAt];
      await sequelize.query(query, {replacements:bindParams, type: QueryTypes.INSERT });
    }
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('People', null, {});
  }
};
