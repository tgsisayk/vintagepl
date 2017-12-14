'use strict';


module.exports = (sequelize, DataTypes) => {
  var Schedule = sequelize.define('Schedule', {
   
    Day: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HomeTeam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AwayTeam: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Score: {
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
