const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/],
    },
    passwordHash: {
        type: String,
        required: true,
    },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo'}],
    profileImgUrl: {
        type: String,
        default: 'images/default-avatar.png'
    },
},
    { timestamps: true }
);

module.exports = model('User', userSchema);