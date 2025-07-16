import express from 'express';
import task from '../models/task.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const tasks = await Task.find({ userId: req.params.userId});
    res.json(tasks);
});

router.post('/', async(req, res) => {
    const task = new Task(req.body);
    await task.save();
    res,status(201).json(task);
});

router.patch('/:id', async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updated);
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

export default router;
