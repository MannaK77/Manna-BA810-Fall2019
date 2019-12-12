var Mongoose = require('mongoose');
var status = ['Available','UnAvailable'];
var Schema = Mongoose.Schema;

var VendorsSchema = new Schema({
    userid : { type: Schema.Types.ObjectId, required: true },
    vendor : { type: String, required: true },
    detail :{ type: String},
    date :{type: Date, default: Date.now, required:true },
    //dateDue :{type: Date, default: Date.now},
    status: { type: String, Enum: ['Available', 'UnAvailable'], default: 'Vendor' },
    
    file : {
        
            name:        { type: String },
            originalname: { type: String }
        
    
    }

});

module.exports = Mongoose.model('vendors', VendorsSchema);
