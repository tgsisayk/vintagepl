
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

  create_group(req, res){
    var userId = sessionHelper.currentUserId(req, res);
    return groups
      .create({
        title: req.body.title,
        createdBy:userId
      })
      .then(group => {
                user.findOne({where: { id: userId } })
                    .then(userSelect => {
                      userSelect.addGroup(group.id, {override:false})
                      })
                  res.status(200).send(group)
                })
      .catch(error => res.status(400).send(error));
  },
  
  //SET FUNCTIONS
  set_group(req, res){
    var userId = sessionHelper.currentUserId(req, res);
    return user
    .findOne({where: { id: userId } })
    .then(userSelect => {
      userSelect.addGroup(req.body.groupId, {override:false})
      res.status(200).send(userSelect)})
    .catch(error => res.status(400).send(error));
  },

  follow_user(req, res){
    var userId = sessionHelper.currentUserId(req, res);
    return user
    .findOne({where: { id: userId } })
    .then(userSelect => {
      userSelect.addPeer(req.body.peerId)
      res.status(200).send(userSelect)
    })
    .catch(error => res.status(400).send(error));
  },

  //GET FUNCTIONS
  get_peers(req, res) {
    var userId = sessionHelper.currentUserId(req, res);
    return user
      .findOne({where: { id: userId } })
      .then(userSelect => 
                {userSelect.getPeer({where:{id:{$ne: userId}}})
                            .then(userPeers=>{
                                 res.status(200).send(userPeers)}
                                )})
      .catch(error => res.status(400).send(error));
  },
    
  get_followers(req, res) {
    var userId = sessionHelper.currentUserId(req, res);
    return user
      .findOne({where: { id: userId } })
      .then(userSelect => {userSelect.getFollower({where:{id:{$ne: userId}}}).then(userFollowers=>res.status(200).send(userFollowers))})
      .catch(error => res.status(400).send(error));
  },

  get_groups(req, res) {
    var userId = sessionHelper.currentUserId(req, res);
    return user
      .findOne({where: { id: userId }})
      .then(userSelect => {
        userSelect.getGroup().then(
            groups =>  res.status(200).send(groups)
        )
      })
      .catch(error => res.status(400).send(error));
  },

  get_users(req, res){
    var userId = sessionHelper.currentUserId(req, res);
    return user
      .all({where: { id: {$ne: userId}}})
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error))
  },

  get_users_suggestions(req, res){
    var userId = sessionHelper.currentUserId(req, res);
    var peersId=[userId]
    user
      .findOne({where: { id: userId } })
      .then(userSelect => 
                {userSelect.getPeer({where:{id:{$ne: userId}}})
                            .then(userPeers=>{
                                  userPeers.forEach(function(u) {
                                    peersId.push(u.id)
                                  }, this);
                                  return user
                                    .all({where: { id: {$notIn: peersId}}})
                                    .then(user => res.status(200).send(user))
                                    .catch(error => res.status(400).send(error))
                            }
                  )})
      .catch(error => res.status(400).send(error));
  },

  get_user(req, res){
    return user
      .all({where: { id: req.body.otherUserId}})
      .then(user => res.status(200).send(user))
      .catch(error => res.status(400).send(error))
  },

  get_user_profile_picture(req,res){
    var userId = -1;
    if(req.params.userId==0){
      userId = sessionHelper.currentUserId(req, res)
    }else{
      userId = req.params.userId
    }
    return user
      .findOne({where: { id: userId}})
      .then(user => {
          res.sendfile('app/bundle/profile/'+user.username+'.jpg',null,function(err){
               if (err) {
                  res.sendfile('app/bundle/darkicon.png');
                }
          })
            
      })
      .catch(error => res.sendfile('app/bundle/darkicon.png'))
  }

};