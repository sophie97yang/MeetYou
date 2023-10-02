'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;


module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Attendances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model:'Events',
          key:'id'
        },
        onDelete:'cascade'
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model:'Users',
          key:'id'
        },
        allowNull:false,
        onDelete: 'cascade'
      },
      status: {
        type: Sequelize.ENUM(['pending','attending','waitlist']),
        allowNull:false,
        defaultValue:'pending'
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
    options.tableName = 'Attendances';
    await queryInterface.dropTable(options);
  }
};
