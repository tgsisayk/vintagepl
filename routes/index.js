const securityController = require('../controllers').securityController
const scheduleController = require('../controllers').scheduleController
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

var sessionHelper = require('../config/session');
var express = require('express');
var router = express.Router();
var sessionHelper = require('../config/session');
var counterValue = 0;
var passport = require("passport");
var Sequelize = require('sequelize');
var model = require('../models')
var path = require('path');


var API_URL='/api/v1'


module.exports = (app, routerSecure) => { 
  app.post(API_URL + '/security/signup', securityController.create_user);
  app.post(API_URL + '/security/login', function(req, res, next) {
    passport.authenticate('local', function(error, user, info) {
      signInUser(req, res, error, user, info);
    })(req, res, next);
  });
  app.get(API_URL + '/security/current/user', function(req, res){
    var userId = sessionHelper.currentUserId(req, res);
    if(userId){
      res.status(200).json({"userId": userId});
    } else {
      res.status(403).json({"userId": userId});
    }
  });
  function signInUser(req, res, error, user, info){
    if(error) { return res.status(500).json(error); }
    if(!user) { return res.status(401).json("Wrong Credentials"); }
    var userId = user.id;
    sessionHelper.setCurrentUserId(req, res, userId);
    res.status(200).json(user);
  }

  require('.'+API_URL+'/'+'securityRouter')(routerSecure, app);
  require('.'+API_URL+'/'+'scheduleRouter')(routerSecure, app);
};


