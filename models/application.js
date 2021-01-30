'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  application.init({
    id_contest: DataTypes.INTEGER,
    id_provider: DataTypes.INTEGER,
    id_participant: DataTypes.INTEGER,
    submission: {
      type:DataTypes.STRING,
      get() {
        const submission = this.getDataValue('submission');
        return "/img/" + submission
      }
    },
    description: DataTypes.TEXT,
    id_status_contest: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    modelName: 'application',
  });
  return application;
};
