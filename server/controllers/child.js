var mongoose = require('mongoose');
var childSchema = require('../models/child');

module.exports = {
    create: function(req, res, next) {
        var Child = mongoose.model('child', childSchema);
        return res.json(new Child());
    }
};
