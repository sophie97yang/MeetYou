'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(
        models.Group,
        { foreignKey:'organizerId',onDelete:'SET NULL',hooks:true }
      );

      User.belongsToMany(
        models.Group,
          { through: models.Membership,
            foreignKey: 'memberId',
            otherKey: 'groupId'
          }
      );

      User.belongsToMany(
        models.Event,
          { through: models.Attendance,
            foreignKey: 'userId',
            otherKey: 'eventId'
          }
      );
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isAlpha:true,
        len:[2,15]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isAlpha:true,
        len:[2,15]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        len:[4,30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error ('Username cannot be an email!')
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        len: [3,256],
        isEmail:true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull:false,
      validate: {
        len:[60,60]
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['createdAt','updatedAt','email','hashedPassword','username']
      }
    }
  });
  return User;
};
