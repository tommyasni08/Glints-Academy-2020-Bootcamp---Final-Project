'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment')
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  payment.init({
    id_contest: DataTypes.INTEGER,
    id_status_contest: DataTypes.INTEGER,
    id_provider: DataTypes.INTEGER,
    bank_provider: DataTypes.STRING,
    account_number_provider: DataTypes.STRING,
    payment_date_provider:{
      type:DataTypes.DATE,
      get() {
        const payment_date_provider = this.getDataValue('payment_date_provider')
        return moment(payment_date_provider).format('DD/MMM/YYYY')
      }
    },
    due_date_provider:{
      type:DataTypes.DATE,
      get() {
        const due_date_provider = this.getDataValue('due_date_provider')
        return moment(due_date_provider).format('DD/MMM/YYYY')
      }
    },
    evidence_provider: {
      type:DataTypes.STRING,
      get() {
        const evidence_provider = this.getDataValue('evidence_provider');
        return "/img/" + evidence_provider
      }
    },
    status_provider_payment: DataTypes.STRING,
    winner: DataTypes.STRING,
    bank_winner: DataTypes.STRING,
    account_number_winner: DataTypes.STRING,
    payment_date_winner: {
      type:DataTypes.DATE, 
      get() {
        const payment_date_winner = this.getDataValue('payment_date_winner')
        return moment(payment_date_winner).format('DD/MMM/YYYY')
      }
    },
    due_date_winner: {
      type:DataTypes.DATE,
      get() {
        const due_date_winner = this.getDataValue('due_date_winner')
        return moment(due_date_winner).format('DD/MMM/YYYY')
      }
    },
    evidence_winner: {
      type:DataTypes.STRING,
      get() {
        const evidence_winner = this.getDataValue('evidence_winner');
        return "/img/" + evidence_winner
      }
    },
    status_winner_payment: DataTypes.STRING,
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    modelName: 'payment',
  });
  return payment;
};
