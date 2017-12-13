'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  },
  {
  name: {
    singular: 'Schedule',
    plural: 'Schedules',
  }
});
  Schedule.associate = function(models) {}

  return Schedule;
};
