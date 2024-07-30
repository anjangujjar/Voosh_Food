const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    const { title, description, column } = req.body;
    try {
        const newTask = new Task({ title, description, column, user: req.user.id });
        const task = await newTask.save();
        res.json(task);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    const { title, description, column } = req.body;
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        task.title = title;
        task.description = description;
        task.column = column;
        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ msg: 'Task not found' });

        await task.remove();
        res.json({ msg: 'Task removed' });
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
