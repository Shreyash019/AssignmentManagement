const mongoose = require('mongoose');

const asigmntModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        //required: true
    },
    uploadTime: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Teacher',
        required: [true, "Creater is required"],
    },
    submitedBy: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Submited By",
        },
    ],
})

const AsigmntModel = mongoose.model('AsigmntModel', asigmntModel);
 module.exports = AsigmntModel;