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

router.get('/', async (req, res, next) => {
    const {_id} = req.payload; 
    try {
        const userFromDB = await User.findById(_id)
        res.status(200).json(userFromDB.todos)  
    } catch (error) {
        console.error('Error trying to find tasks', error);
        res.status(500).json(error)
    }
})

module.exports = router;