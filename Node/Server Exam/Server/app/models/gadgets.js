var Mongoose = require('mongoose');
//const Bcrypt = require('bcryptjs');
var Schema = Mongoose.Schema;

var gadgetSchema = new Schema({
    Yoo: { type: String, required: true },
    Hoo: { type: Number, default: 10 },
    
        //dateRegistered: { type: Date, default: Date.now }


});


module.exports = Mongoose.model('Gadget', gadgetSchema);
