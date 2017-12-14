
const user = require('../models').SecurityUser
var sessionHelper = require('../config/session');

module.exports = {
  //CREATE FUNCTIONS
  create_user(req, res) {
    return user
      .create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error));
  },
 
 
  get_users(req, res){
    var userId = sessionHelper.currentUserId(req, res);
    console.log("finfing user")
    return user
      .all({where: { id: {$ne: userId}}})
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error))
  },

  get_user(req, res){
    return user
      .all({where: { id: req.body.otherUserId}})
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error))
  },


};