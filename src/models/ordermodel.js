const mongoose = require('mongoose');
const objectid = mongoose.Schema.Types.ObjectId

const orderschema = new mongoose.Schema({
    userid: {
        type: objectid,
        ref: "User"
    },
    productid: {
        type: objectid,
        ref: "product"
    },
    amount: Number,
    isFreeAppUser: Boolean,
    date: String
}, { timestamps: true });

module.exports = mongoose.model('order', orderschema)
