var Household = require('../models/household')

module.exports = {
  save: function(req, res) {
    var household = new Household(req.body);
    household.save(function (err, household) {
      if (err) {
        console.error(err);
        return res.send(err);
      }
    return res.send(household);
    });
  },

  find: function(req, res) {

  }

};
