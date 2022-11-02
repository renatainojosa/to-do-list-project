const router = require('express').Router();

const Todo = require('../models/Todo.model');
const User = require('../models/User.model')

router.post('/new-task', async (req, res, next) => {
    const { description, done } = req.body;
    const {_id} = req.payload;

    try {        
        const taskFromDB = await Todo.create({description, done, _id})
        await User.findByIdAndUpdate( _id, { $push: {todos: taskFromDB._id}}, {new: true})
        res.status(200).json(taskFromDB);
    } catch (error) {
        console.error('Error trying to create task', error);
        res.status(500).json(error)
    }
});

router.get('/:userId', async (req, res, next) => {
    const {userId} = req.params; 
    try {
        const userFromDB = await User.findById(userId)
        res.status(200).json(userFromDB.todos)  
    } catch (error) {
        console.error('Error trying to find tasks from user', error);
        res.status(500).json(error)
    }
});

router.put('/:taskId', async (req, res, next) => {
    const {taskId} = req.params;
    const {description} = req.body;

    try {
        const taskFromDB = await Todo.findByIdAndUpdate(taskId, {description}, {new: true});
        res.status(200).json(taskFromDB)
    } catch (error) {
        console.error('Error trying to find task', error);
        res.status(500).json(error)
    }
});

router.delete('/:taskId', async (req, res, next) => {
    const {taskId} = req.params;
    const {_id} = req.payload;

    try {
        const taskFromDB = await Todo.findByIdAndRemove(taskId)
        await User.findByIdAndUpdate(_id, { $pull: {todos: taskId}}, {new: true})
        res.status(201).json(taskFromDB)
    } catch (error) {
        console.error('Error trying to delete task', error);
        res.status(500).json(error)
    }
})

module.exports = router;