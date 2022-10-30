const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    user: Schema.Types.ObjectId
});

module.exports = model('Todo', todoSchema)