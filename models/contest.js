'use strict';
const {
  Model
} = require('sequelize');
const moment = require('moment');

const numFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits:0
})

const dateFormatter = new Intl.DateTimeFormat('en-GB', {dateStyle:'full'})

module.exports = (sequelize, DataTypes) => {
  class contest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  contest.init({
    title: {
      type:DataTypes.STRING,
      unique:true
    },
    id_provider: DataTypes.INTEGER,
    prize: {
      type: DataTypes.DECIMAL,
      get() {
        const prize = this.getDataValue('prize')
        return numFormatter.format(prize)
      }
    },
    due_date: {
      type:DataTypes.DATE,
      get() {
        const due_date = this.getDataValue('due_date')
        return moment(due_date).format('dddd, DD MMMM YYYY')
      }
    },
    description: DataTypes.TEXT,
    id_status_contest: DataTypes.INTEGER,
    announcement:{
      type:DataTypes.DATE,
      get() {
        const announcement = this.getDataValue('announcement')
        return moment(announcement).format('dddd, DD MMMM YYYY')
      }
    }
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    modelName: 'contest',
  });
  return contest;
};
