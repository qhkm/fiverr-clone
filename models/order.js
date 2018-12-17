const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    buyer: {
        type: Type.Schema.ObjectId,
        ref: 'User'
    },
    seller: {
        type: Type.Schema.ObjectId,
        ref: 'User'
    },
    gig: {
        type: Type.Schema.ObjectId,
        ref: 'Gig'
    },
    messages: [
        {
            message: {
                type: String
            },
            creator: {
                type: Type.Schema.ObjectId,
                ref: 'User'
            },
            date: {
                type: Date
            }
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', OrderSchema);