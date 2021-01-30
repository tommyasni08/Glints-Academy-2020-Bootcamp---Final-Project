'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_contest: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      id_status_contest:{
        allowNull:false,
        type: Sequelize.INTEGER
      },
      id_provider: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      bank_provider: {
        allowNull: true,
        type: Sequelize.STRING
      },
      account_number_provider: {
        allowNull: true,
        type: Sequelize.STRING
      },
      payment_date_provider: {
        allowNull: true,
        type: Sequelize.DATE
      },
      due_date_provider: {
        allowNull: true,
        type: Sequelize.DATE
      },
      evidence_provider: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status_provider_payment: {
        allowNull: true,
        type: Sequelize.STRING
      },
      winner: {
        allowNull: true,
        type: Sequelize.STRING
      },
      bank_winner: {
        allowNull: true,
        type: Sequelize.STRING
      },
      account_number_winner: {
        allowNull: true,
        type: Sequelize.STRING
      },
      payment_date_winner: {
        allowNull: true,
        type: Sequelize.DATE
      },
      due_date_winner: {
        allowNull: true,
        type: Sequelize.DATE
      },
      evidence_winner: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status_winner_payment: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment');
  }
};
