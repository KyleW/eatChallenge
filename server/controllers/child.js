var Child = require('../models/child');

module.exports = {
    create: function(req, res, next) {
        var child = new Child(req.body);
        return res.send(child);
        // child.save(function (err, household) {
        //     if (err) {
        //         console.error(err);
        //         return res.send(err);
        //     }
        //     console.log('successfully saved ' , child);
        //     return res.send(child);
        // });
    }
};
