const securityController = require('../../../controllers').securityController
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

  routerSecure.use(function(req, res, next){
      var userId = sessionHelper.currentUserId(req, res);
      if(userId==undefined) {
          return res.status(403).json({ errors: { user: ["must_be_signed_in"] } });
      }else if(userId){
          next()
      }

  })
  routerSecure.post(API_URL + '/security/get/user', securityController.get_user);
  routerSecure.get(API_URL+ '/security/logout', function(req, res) {
    req.session.destroy();
    sessionHelper.clearCurrentUserId(req, res);
    res.status(200).end();
  });

  function signInUser(req, res, error, user, info){
    if(error) { return res.status(500).json(error); }
    if(!user) { return res.status(401).json("Wrong Credentials"); }
    var userId = user.id;
    sessionHelper.setCurrentUserId(req, res, userId);
    res.status(200).json(user);
  }

};


