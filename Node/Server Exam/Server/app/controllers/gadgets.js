'use strict'
var express = require('express'),
router = express.Router(),
logger = require('../../config/logger');
var mongoose = require('mongoose'),
Gadget = mongoose.model('Gadget');

module.exports = function (app, config) {
    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 

    router.route('/gadgets').get((req, res, next) => {
        logger.log('info', 'Get all gadgets');
        var query = Gadget.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No Gadgets" });
                }
            })
            .catch(err => {
                return next(err);
            });
    });


    router.route('/gadgets').post((req, res, next) => {
        logger.log('info', 'Create Gadget');
        var user = new Gadget(req.body);
        user.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch((err) => {
                return next(err);
            });

    });

   // router.route('/gadgets/login').post(requireLogin, login);

    router.route('/gadgets/:id').get((req, res, next) => {
        logger.log('info', 'Get gadget %s', req.params.id);
        Gadget.findById(req.params.id)
            .then(gadget => {
                if (gadget) {
                    res.status(200).json(gadget);
                } else {
                    res.status(404).json({ message: "No gadget found" });
                }
            })
            .catch(error => {
                return next(error);
            });

    });

    router.route('/gadgets/:id').put((req, res, next) => {
        logger.log('info', 'Get gadget %s', req.params.id);
        Gadget.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(gadget => {
                res.status(200).json(gadget);
            })
            .catch(error => {
                return next(error);
            });

    });

    router.route('/gadgets/:id').delete((req, res, next) => {
        logger.log('info', 'Delete gadget ' + req.params.id);
        Gadget.remove({ _id: req.params.id })
            .then(gadget => {
                res.status(200).json({ msg: "Gadget Deleted" });
            })
            .catch(error => {
                return next(error);
            });
    });

    router.put('/gadgets/:id', function (req, res, next) {
        logger.log('info', 'Update gadget ' + req.params.id);
        Gadget.findById(req.params.id)
            .exec()
            .then(function (gadget) {
                // if (req.body.password !== undefined) {
                //     gadget.password = req.body.password;
                // }
                gadget.save().then(function (gadget) {
                    res.status(200).json(gadget);
                }).catch(function (err) {
                    return next(err);
                });
            })
            .catch(function (err) {
                return next(err);
            });
    });

}
