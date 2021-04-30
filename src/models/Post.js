const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        trim: true,
        maxlength: [150, 'The title is very long, max 50 words'],
        required: true
    },
    subtitle: {
        type: String,
        trim: true,
        maxlength: [150, 'The subtitle is very long, max 150 words'],
    },
    img: {
        type: String,
        trim: true
    },
    article: {
        type: String,
        trim: true,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});



module.exports = model('Post', postSchema);