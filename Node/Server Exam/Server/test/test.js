//During the test the env variable is set to test
process.env.NODE_ENV = 'test';
var mongoose = require("mongoose");
const Gadget = require('../app/models/gadgets');
const Todo = require('../app/models/todos');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);

it('it should GET the index.html file', (done) => {
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

describe('Gadget', () => {
    beforeEach((done) => {
        Gadget.remove({}, (err) => {
            done();
        });
    });

    it('it should POST a gadget', (done) => {
        var gadget = {
            "Yoo": "Watch",
            "Hoo": "2",
                    }
        chai.request(server)
            .post('/api/gadgets')
            .send(gadget)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('Yoo');
                res.body.Yoo.should.be.a('string');
                res.body.Yoo.should.equal('Watch');
                done();
            });
    });
    
    it('it should GET all the gadgets', (done) => {
        var gadget = new Gadget({
            "Yoo": "Watch",
              "Hoo": "2"
        });
        gadget.save((err, gadget) => {
            chai.request(server)
                .get('/api/gadgets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    it('it should GET all the gadgets', (done) => {
        var gadget = new Gadget({
            "Yoo": "Watch",
            "Hoo": "2"
        });
        gadget.save((err, gadget) => {
            chai.request(server)
                .get('/api/gadgets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    it('it should GET a gadget by the given id', (done) => {
        var gadget = new Gadget({
            "Yoo": "Watch",
            "Hoo": "2"
        });

        gadget.save((err, gadget) => {
            chai.request(server)
                .get('/api/gadgets/' + gadget._id)
                .send(gadget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Yoo');
                    res.body.should.have.property('Hoo');
                    res.body.should.have.property('_id').eql(gadget._id.toString());
                    done();
                });
        });

    });

    it('it should GET a gadget by the given id', (done) => {
        var gadget = new Gadget({
            "Yoo": "Watch",
             "Hoo": "2"
        });

        gadget.save((err, gadget) => {
            chai.request(server)
                .get('/api/gadgets/' + gadget._id)
                .send(gadget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Yoo');
                    res.body.should.have.property('Hoo');
                    res.body.should.have.property('_id').eql(gadget._id.toString());
                    done();
                });
        });

    });

    it('it should UPDATE a gadget', (done) => {

        var gadget = new Gadget({
            "Yoo": "Watch",
            "Hoo": "3"
        });
        gadget.save((err, gadget) => {
            chai.request(server)
                .put('/api/gadgets/' + gadget._id)
                .send({
                    "_id": gadget._id,
                    "Yoo": "Watch",
                    "Hoo": "3"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('Hoo').eql(3);
                    res.body.should.have.property('Yoo').eql('Watch');
                    done();
                });
        });
    });

    it('it should DELETE a gadget given the id', (done) => {
        var gadget = new Gadget({
            "Yoo": "Watch",
            
            "Hoo": "2"
        });
        gadget.save((err, gadget) => {
            chai.request(server)
                .delete('/api/gadgets/' + gadget.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

 });

var GADGET_ID;

describe('ToDos', () => {
    beforeEach((done) => {
        Todo.remove({}, (err) => {
               done();
            });
        });
   

    var gadget = new Gadget({
        "Yoo": "Watch",
         "Hoo": "2"
    });
    gadget.save((err, gadget) => {
        GADGET_ID = gadget._id;
    });

    it('it should POST a todo', (done) => {
        var todo = {
            "gadgetid": GADGET_ID,
            "todo": "This is my ToDo"
        }
        chai.request(server)
            .post('/api/todos')
            .send(todo)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('todo');
                res.body.todo.should.be.a('string');
                res.body.todo.should.equal('This is my ToDo');
                done();
            });
    });


    it('it should GET a gadgets todos', (done) => {
        var todo = new Todo({
            "gadgetid": GADGET_ID,
            "todo": "This is my ToDo"
        })
        todo.save((err, todo) => {
            chai.request(server)
                .get('/api/todos/gadget/' + GADGET_ID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    it('it should GET a todo', (done) => {
        var todo = new Todo({
            "gadgetid": GADGET_ID,
            "todo": "This is my ToDo"
        })

        todo.save((err, todo) => {
            chai.request(server)
                .get('/api/todos/' + todo._id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('gadgetid');
                    res.body.should.have.property('todo');
                    res.body.should.have.property('status');
                    res.body.should.have.property('dateCreated');
                    res.body.should.have.property('_id').eql(todo._id.toString());
                    done();
                });
        });
    });

    it('it should UPDATE a todo', (done) => {

        var todo = new Todo({
            "gadgetid": GADGET_ID,
            "todo": "This is my ToDo",
            "detail": "This is a description"
        })
        todo.save((err, todo) => {
            chai.request(server)
                .put('/api/todos/' + todo._id)
                .send({
                    "_id": todo._id,
                    "gadgetid": GADGET_ID,
                    "todo": "Get it done!",
                    "detail": "I don't need a description",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('todo').eql('Get it done!');
                    res.body.should.have.property('detail').eql("I don't need a description");
                    done();
                });
        });
    });

    it('it should DELETE a todo given the id', (done) => {
        var todo = new Todo({
            "gadgetid": GADGET_ID,
            "todo": "This is my ToDo",
            "description": "This is a description"
        })
        todo.save((err, todo) => {
            chai.request(server)
                .delete('/api/todos/' + todo.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});




