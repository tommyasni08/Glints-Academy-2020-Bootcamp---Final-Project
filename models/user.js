const bcrypt = require('bcrypt');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    fullname: {
      type: DataTypes.STRING,
      // unique:true
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique:true
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
      }
    },
    picture: {
      type: DataTypes.STRING,
      defaultValue: 'user_0_picture.jpeg',
      get() {
        const picture = this.getDataValue('picture');
        return "/img/" + picture
      }
    },
    id_role: DataTypes.INTEGER,
    location: DataTypes.STRING,
    bank: DataTypes.STRING,
    account_number: {
      type:DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    paranoid: true,
    timestamps: true,
    freezeTableName: true,
    modelName: 'user',
  });
  return user;
};
