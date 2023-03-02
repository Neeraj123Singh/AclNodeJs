'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.createTable('roles', 
      {
        id:{
          allowNull:false,
          type: Sequelize.UUID, //changing this to Sequelize.UUID does not make any difference
          default: Sequelize.UUIDV4
        },
        name:{
          type:Sequelize.STRING,
          allowNull:false
        },
        created_at:{
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at:{
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
  },
  {
    timeStamp: true,
    createdAt: true,
    updatedAt: true
  });
}, 

  async down (queryInterface, Sequelize) {
  
      await queryInterface.dropTable('roles');
     
  }
};
