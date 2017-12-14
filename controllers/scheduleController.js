
const schedule = require('../models').Schedule
var sessionHelper = require('../config/session');

module.exports = {
  create_schedule(req, res) {
    return schedule
      .create({
        Day: req.body.date,
        HomeTeam: req.body.hometeam,
        AwayTeam: req.body.awayteam,
        HomeScore: req.body.homescore,
        AwayScore: req.body.awayscore,
        Time: req.body.time
        
      })
      .then(schedule => res.status(200).send(schedule))
      console.log(">>> here")
      .catch(error => res.status(400).send(error));
  },

  get_schedule(req, res){
    return schedule
      .all()
      .then(schedule => res.status(200).send(schedule))
      .catch(error => res.status(400).send(error))
  },

  get_some_schedule(req, res){
    return schedule
      .all({where: { id: req.body.id}})
      .then(schedule => res.status(200).send(schedule))
      .catch(error => res.status(400).send(error))
  },
};