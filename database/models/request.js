'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Request.init({
    state: DataTypes.STRING,
    privateKey: DataTypes.TEXT,
    offerCode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};
