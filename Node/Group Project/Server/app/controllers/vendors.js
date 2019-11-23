'use strict'

var express = require('express'),

    router = express.Router(),

    logger = require('../../config/logger'),

    mongoose = require('mongoose'),

    Vendor = mongoose.model('vendors');



module.exports = function (app, config) {

    app.use('/api', router);//middleware that installs the router all routes will go below here in this loop only 

    router.route('/vendors').get((req, res, next) => {

        logger.log('info', 'Get all vendors');
        var query = Vendor.find()

            .sort(req.query.order)

            .exec()

            .then(result => {

                if (result && result.length) {

                    res.status(200).json(result);

                } else {

                    res.status(404).json({ message: "No vendors" });

                }

            })

            .catch(err => {

                return next(err);

            });



    });



    router.route('/vendors/user/:id').get((req, res, next) => {

        logger.log('info', 'Get all vendors', req.params.id);

        var query = Vendor.find()

            .sort(req.query.order)

            .exec()

            .then(result => {

                if (result && result.length) {

                    res.status(200).json(result);

                } else {

                    res.status(404).json({ message: "No vendors" });

                }

            })

            .catch(err => {

                return next(err);

            });



    });



    router.route('/vendors/:id').get((req, res, next) => {

        logger.log('info', 'Get vendors %s', req.params.id);



        Vendor.findById(req.params.id)

            .then(user => {

                if (user) {

                    res.status(200).json(user);

                } else {

                    res.status(404).json({ message: "No Vendors found" });

                }

            })

            .catch(error => {

                return next(error);

            });



    });



    router.route('/vendors/:id').put((req, res, next) => {

        logger.log('info', 'Get vendors %s', req.params.id);



        Vendor.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })

            .then(Vendor => {

                res.status(200).json(Vendor);

            })

            .catch(error => {

                return next(error);

            });



    });

    router.route('/vendors').post((req, res, next) => {

        logger.log('info', 'Create Vendor');



        var vendor = new Vendor(req.body);

        vendor.save()

            .then(result => {

                res.status(201).json(result);

            })

            .catch((err) => {

                return next(err);

            });



    });



    router.route('/vendors/login').post((req, res, next) => {

        logger.log('info', '%s logging in', req.body.email);

        var email = req.body.email

        var password = req.body.password;



        var obj = { 'email': email, 'password': password };

        res.status(201).json(obj);

    });



    router.route('/Vendors/:id').delete((req, res, next) => {

        logger.log('info', 'Get vendor %s', req.params.id);



        Vendor.remove({ _id: req.params.id })

            .then(Vendor => {

                res.status(200).json({ msg: "vendor Deleted" });

            })

            .catch(error => {

                return next(error);

            });

    });



};

