'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      venueId: {
        type: Sequelize.INTEGER,
        // allowNull:false,
        references:{
          model:'Venues',
          key:'id'
        }
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'Groups',
          key:'id'
        },
        onDelete:'cascade'
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      type: {
        type: Sequelize.ENUM(['Online','In person']),
        allowNull:false
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      price: {
        type: Sequelize.FLOAT(4,2),
        allowNull:false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue:Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Events';
    await queryInterface.dropTable(options);
  }
};
