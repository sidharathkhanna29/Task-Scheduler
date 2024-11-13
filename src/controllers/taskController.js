const Task = require('../models/taskModel');
const { scheduleNotification } = require('../scheduler');

exports.createTask = async (req, res) => {
    try {
        const { title, description, scheduledTime } = req.body;
        const task = new Task({ title, description, scheduledTime });
        await task.save();
        scheduleNotification(task);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
};