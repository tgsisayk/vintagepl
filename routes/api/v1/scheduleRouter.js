const scheduleController = require('../../../controllers').scheduleController
var sessionHelper = require('../../../config/session');
var passport = require('passport')
, LocalStrategy = require('passport-local').Strategy;

var express = require('express');
var router = express.Router();
var counterValue = 0;
var passport = require("passport");
var Sequelize = require('sequelize');

var API_URL='/api/v1'
var app = express();


module.exports = (routerSecure, app) => {

  app.post(API_URL + '/schedule/create', scheduleController.create_schedule);
  app.get(API_URL + '/schedule/get', scheduleController.get_schedule);

  routerSecure.use(function(req, res, next){
      var userId = sessionHelper.currentUserId(req, res);
      if(userId==undefined) {
          return res.status(403).json({ errors: { user: ["must_be_signed_in"] } });
      }else if(userId){
          next()
      }

  })
  

};


