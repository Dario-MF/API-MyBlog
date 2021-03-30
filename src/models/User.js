const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');


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
    img: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'password is required.']

    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId,
        required: [true, 'rol is required.']
    }],
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

// Parsing for all response, not password and rename _id
userSchema.methods.toJSON = function () {
    const { password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};



module.exports = model('user', userSchema);