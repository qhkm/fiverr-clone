const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    buyer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gig: {
        type: Schema.Types.ObjectId,
        ref: 'Gig'
    },
    messages: [
        {
            message: {
                type: String
            },
            creator: {
                type: Schema.Types.ObjectId,
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