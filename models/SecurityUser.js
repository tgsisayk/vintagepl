'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  var SecurityUser = sequelize.define('SecurityUser', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9\_\-]+$/i,
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    phone2: {
      type: DataTypes.INTEGER,
    },
    token: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate:{
        not: ["[a-z]",'i'], 
        is: ["[0-9]", 'i'],
      },
    },
    points:  {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate:{
        not: ["[a-z]",'i'], 
        is: ["[0-9]", 'i']
      }
    },
    isLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    salt: {
      type: DataTypes.STRING
    }
  },
  {
  name: {
    singular: 'SecurityUser',
    plural: 'SecurityUsers',
  }
});

  SecurityUser.prototype.generateHash= function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  }

  SecurityUser.prototype.validPassword= function(password) {

    return bcrypt.compareSync(password, this.password);
  },

  SecurityUser.prototype.getmessage= function(){
  }
    
  SecurityUser.hook('beforeCreate', function(user, options) {
    user.password = user.generateHash(user.password);
  });


  SecurityUser.associate = function(models) {}

  sequelize.sync({ force:false });
  return SecurityUser;
};
