'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger');
    mongoose = require('mongoose'),
    User = mongoose.model('User');
module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 

    router.route('/users').get((req, res, next) => {
        logger.log('info', 'Get all users');
        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No users" });
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    //res.status(200).json({ message:'Got all users' });//remove after database stuff is added the got user with code that retrieve users from db 

};

router.route('/users').post((req, res, next) => {
    logger.log('info', 'Create User');
    var user = new User(req.body);
    user.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch((err) => {
            return next(err);
        });

});

router.route('/users/login').post((req, res, next) => {
    logger.log('info', '%s logging in', req.body.email);
    var email = req.body.email
    var password = req.body.password;

    var obj = { 'email': email, 'password': password };
    res.status(201).json(obj);
});

router.route('/users/:id').get((req, res, next) => {
    logger.log('info', 'Get user %s', req.params.id);
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "No user found" });
            }
        })
        .catch(error => {
            return next(error);
        });

});
router.route('/users/:id').put((req, res, next) => {
    logger.log('info', 'Get user %s', req.params.id);
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
        .then(user => {
            res.status(200).json(user);
        })
        .catch(error => {
            return next(error);
        });

});

router.route('/users/:id').delete((req, res, next) => {
     logger.log('info', 'Delete user ' + req.params.id);
        User.remove({ _id: req.params.id })
            .then(user => {
                res.status(200).json({ msg: "User Deleted" });
            })
            .catch(error => {
                return next(error);
            });
});
