const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const md5 = require('md5');
require('dotenv').config();


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required.'],
        trim: true,
        maxlength: [20, 'The name value exceeds the max field length 20']
    },
    surname: {
        type: String,
        required: [true, 'surname is required.'],
        trim: true,
        maxlength: [30, 'The name value exceeds the max field length 30']
    },
    email: {
        type: String,
        required: [true, 'email is required.'],
        trim: true,
        unique: true
    },
    img_avatar: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'password is required.']

    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
    }],
    posts: {
        type: String
    },
    google: {
        type: Boolean,
        default: false
    },
    state: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

// Encrypt password
userSchema.statics.ecryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compare password vs encrypted password
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
};

// Parsing for all response json.
userSchema.methods.toJSON = function () {
    const { password, _id, img_avatar, ...user } = this.toObject();
    user.img_avatar = (img_avatar) ? img_avatar : `https://gravatar.com/avatar/${_id}?d=retro`;
    user.posts = `${process.env.PATH_API}/posts?author=${_id}?page=1`;
    user.uid = _id;
    return user;
};





module.exports = model('User', userSchema);