var Mongoose = require('mongoose');
var status = ['Todo','InProcess','Completed'];
var Schema = Mongoose.Schema;

var VendorSchema = new Schema({
    userid : { type: Schema.Types.ObjectId, required: true },
    vendor : { type: String, required: true },
    detail :{ type: String},
    dateCreated :{type: Date, default: Date.now},
    dateDue :{type: Date, default: Date.now},
    status : { type : String, enum: status,default: 'Vendor '},
    
    file : {
        
            name:        { type: String },
            originalname: { type: String }
           
    }


});

module.exports = Mongoose.model('vendors', VendorSchema);
