const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    post: {
        ref: 'Post',
        type: Schema.Types.ObjectId,
        required: [true, 'post id is required.']
    },
    author: {
        ref: 'User',
        type: Schema.Types.ObjectId,
        required: [true, 'user id is required.']
    },
    comment: {
        type: String,
        required: [true, 'comment is required.'],
        trim: true,
        maxlength: [1000, 'The comment value exceeds the max field length 1000']
    }
}, {
    versionKey: false,
    timestamps: true
});


module.exports = model('Comment', commentSchema);