const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        trim: true,
        maxlength: [50, 'The title is very long, max 50 words'],
        required: true
    },
    subtitle: {
        type: String,
        trim: true,
        maxlength: [100, 'The subtitle is very long, max 100 words'],
    },
    img_path: {
        type: String,
        trim: true,
        maxlength: [100, 'The path is very long, max 100 words'],
    },
    article: {
        type: String,
        trim: true,
        maxlength: [2400, 'The post is very long, max 2400 words'],
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});



module.exports = model('Post', postSchema);