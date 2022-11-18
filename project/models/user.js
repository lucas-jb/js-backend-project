'use strict';

const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Task,{
        as: 'tasks'
      });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: DataTypes.STRING,
    password: DataTypes.VIRTUAL
  }, {
    sequelize,
    modelName: 'User',
  });

  User.login = (email, password) => {
    return User.findOne({
      where: {
        email : email
      }
    }).then(user=>{
      if(!user) return null;
      return user.authenticatePassword(password, user.password_hash)
      .then(valid => valid ? user : null);
    });
  };

  User.prototype.authenticatePassword = (password, password_hash)=>{
    return new Promise((res,rej)=>{
      bcrypt.compare(password, password_hash, (err,valid)=>{
        if(err) return rej(err);
        res(valid);
      })
    });
  }

  User.beforeCreate((user,options)=>{
    return new Promise((res,rej)=>{

      if(user.password){
        bcrypt.hash(user.password, 10, (error, hash)=>{
          user.password_hash = hash;
          res();
        })
      };
      
    });
  });
  return User;
};