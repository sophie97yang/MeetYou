'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Memberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Users',
          key:'id'
        },
        allowNull:false,
        onDelete: 'cascade'
      },
      groupId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Groups',
          key:'id'
        },
        allowNull:false,
        onDelete:'cascade'
      },
      status: {
        type: Sequelize.ENUM(['co-host','member','pending']),
        allowNull:false,
        defaultValue:'pending'
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
    options.tableName = 'Memberships';
    await queryInterface.dropTable(options);
  }
};
