//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
const mongoose = require("mongoose");
User = require('../app/models/users');
 var Vendor = require('../app/models/vendors');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);
it('it should GET the index.html file',(done)=>{
    chai.request(server)
    .get('/index.html')
    .end((err,res) => {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });

    
});
it('it should return 404', (done) => {
    chai.request(server).get('/index2.html')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
});

describe('User', () => {
    beforeEach((done) => { 
        User.remove({}, (err) => {
            done();
        });
    });
    //Insert user tests here
    it('it should POST a user', (done) => {
        var user = {
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "woo@hoo.com",
            "password": "pass"
        }
        chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('firstName');
                res.body.firstName.should.be.a('string');
                res.body.firstName.should.equal('Jane');
                done();
            });
    });
    it('it should not POST a user without email field', (done) => {
        var user = {
            "firstName": "Jane",
            "lastName": "Doe",
            "password": "pass"
        }
        chai.request(server)
            .post('/api/users')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });
    // it('it should not POST a user without email field', (done) => {
    //     var user = {
    //         "firstName": "Jane",
    //         "lastName": "Doe",
    //         "password": "pass"
    //     }
    //     chai.request(server)
    //         .post('/api/users')
    //         .send(user)
    //         .end((err, res) => {
    //             res.should.have.status(500);
    //             done();
    //         });
    // });
    it('it should GET all the users', (done) => {
        var user = new User({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });
        user.save((err, user) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    it('it should GET all the users', (done) => {
        var user = new User({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });
        user.save((err, user) => {
            chai.request(server)
                .get('/api/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });
    it('it should GET a user by the given id', (done) => {
        var user = new User({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });

        user.save((err, user) => {
            chai.request(server)
                .get('/api/users/' + user._id)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('_id').eql(user._id.toString());
                    done();
                });
        });

    });
    it('it should GET a user by the given id', (done) => {
        var user = new User({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });

        user.save((err, user) => {
            chai.request(server)
                .get('/api/users/' + user._id)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('_id').eql(user._id.toString());
                    done();
                });
        });

    });
    it('it should UPDATE a user', (done) => {

        var user = new User({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "yoo@hoo.com",
            "password": "pass"
        });
        user.save((err, user) => {
            chai.request(server)
                .put('/api/users/' + user._id)
                .send({
                    "_id": user._id,
                    "firstName": "Joey",
                    "lastName": "Doe",
                    "email": "yoo@hoo.edu",
                    "password": "pass"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql('yoo@hoo.edu');
                    res.body.should.have.property('firstName').eql('Joey');
                    done();
                });
        });
    });
    it('it should DELETE a user given the id', (done) => {
        var user = new User({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "five@hoo.com",
            "password": "pass"
        });
        user.save((err, user) => {
            chai.request(server)
                .delete('/api/users/' + user.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});

var USER_ID;

describe('Vendor', () => {
    beforeEach((done) => {
        Vendor.remove({}, (err) => {
            done();
        });
    });
    var user = new User({
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "JaneDoe@hoo.com",
        "password": "pass"
    });
    user.save((err, user) => {
        USER_ID = user._id;
    });

    it('it should POST a vendor', (done) => {
        
        var vendor = {
            "userid": USER_ID,
            "vendor": "This is my Vendor"
        }

        chai.request(server)
            .post('/api/vendors')
            .send(vendor)
            .end((err, res) => {
                console.log(err)
                res.should.have.status(201);
                res.body.should.have.property('vendor');
                res.body.vendor.should.be.a('string');
                res.body.vendor.should.equal('This is my Vendor');
                done();
            });
    });

    it('it should GET a users vendors', (done) => {
        var vendor = new Vendor({
            "userid": USER_ID,
            "vendor": "This is my Vendor"
        })
        vendor.save((err, vendor) => {
            chai.request(server)
                .get('/api/vendors/user/' + USER_ID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

     it('it should GET a vendor', (done) => {
         var vendor = new Vendor({
             "userid": USER_ID,
             "vendor": "This is my Vendor",
         })
         vendor.save((err, vendor) => {
             chai.request(server)
                 .get('/api/vendors/' + vendor._id)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.should.have.property('userid');
                     res.body.should.have.property('vendor');
                     res.body.should.have.property('status');
                     res.body.should.have.property('dateCreated');
                     res.body.should.have.property('_id').eql(vendor._id.toString());
                     done();
                 });
         });
     });

    it('it should UPDATE a vendor', (done) => {

        var vendor = new Vendor({
            "userid": USER_ID,
            "vendor": "This is my Vendor",
            "detail": "This is a status"
        })
        vendor.save((err, vendor) => {
            chai.request(server)
                .put('/api/vendors/' + vendor._id)
                .send({
                    "_id": vendor._id,
                    "userid": USER_ID,
                    "vendor": "Get it done!",
                    "detail": "I don't need a status",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('vendor').eql('Get it done!');
                    res.body.should.have.property('status').eql("Vendor");
                    done();
                });
        });
    });

    it('it should DELETE a vendor given the id', (done) => {
        var vendor = new Vendor({
            "userid": USER_ID,
            "vendor": "This is my Vendor",
            "description": "This is a description"
        })
        vendor.save((err, vendor) => {
            chai.request(server)
                .delete('/api/vendors/' + vendor.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

it('it should GET the login.html file', (done) => {
    chai.request(server)
        .get('/login.html')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
});

it('it should return 404', (done) => {
    chai.request(server).get('/index2.html')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
});
  
