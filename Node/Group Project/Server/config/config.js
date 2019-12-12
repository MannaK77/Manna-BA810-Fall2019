var path = require('path'),
rootPath = path.normalize(__dirname + '/..'),
env = process.env.NODE_ENV || 'development';
var config = {
development: {
    root: rootPath,
    app: { name: 'EventME' },
    port: 5000,
  db: 'mongodb://127.0.0.1/vendor-dev',
  secret: "cayennedlikedhistreats"
},
test: {
    root: rootPath,
    app: { name: 'ThingsToDo' },
    port: 4000,
     db :'mongodb://127.0.0.1/vendor-test',
     secret: "cayennedlikedhistreats"
    },
    
production: {
    root: rootPath,
    app: { name: 'EventMe' },
    port: 80,
     db: 'mongodb://127.0.0.1/vendor-production',
     secret: "cayennedlikedhistreats"
}
};

module.exports = config[env];
