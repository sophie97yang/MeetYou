'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      organizerId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
        },
        onDelete: 'SET NULL'
      },
      name: {
        type: Sequelize.TEXT(60),
        allowNull:false,
        unique:true
      },
      about: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      type: {
        type: Sequelize.ENUM(['Online','In person']),
        allowNull:false
      },
      private: {
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      city: {
        type: Sequelize.TEXT(15),
        allowNull:false
      },
      state: {
        type: Sequelize.STRING(15),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Groups';
    await queryInterface.dropTable(options);
  }
};
