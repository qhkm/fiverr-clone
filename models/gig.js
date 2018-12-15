const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GigSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    category: String,
    about: String,
    price: Number,
    picture: {
        type: String,
        default: 'http://placehold.it/350x150'
    },
    created: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Gig', GigSchema);