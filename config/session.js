
const cookieParams = {
  signed: true,
};

const USER_ID = "userIdVintage";

module.exports = {

  currentUserId: function(req, res) {
    return parseInt(req.signedCookies[USER_ID]) || undefined;
  },

  setCurrentUserId: function(req, res, userId) {
    return res.cookie(USER_ID, userId, cookieParams);
  },

  clearCurrentUserId: function(req, res) {
    var user = req.signedCookies[USER_ID]
    return res.clearCookie(USER_ID);
  }

}