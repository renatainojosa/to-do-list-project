const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
    todos: [Schema.Types.ObjectId],
    profileImgUrl: {
        type: String,
        default: 'images/default-avatar.png'
    },
},
    { timestamps: true }
);

module.exports = model('User', userSchema);