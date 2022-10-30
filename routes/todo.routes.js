const router = require('express').Router();

const Todo = require('../models/Todo.model');
const User = require('../models/User.model')

router.post('/new-task', async (req, res, next) => {
    const { description, done, userId } = req.body;

    try {
        const taskFromDB = await Todo.create({description, done, user: userId})
        await User.findByIdAndUpdate(userId, { $push: {todos: taskFromDB._id}})
        res.status(200).json(taskFromDB);
    } catch (error) {
        console.error('Error trying to create task', error);
        res.status(500).json(error)
    }
});

module.exports = router;