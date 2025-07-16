import express from 'express';
import task from '../models/task.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
    const tasks = await Task.find({ userId: req.params.userId});
    res.json(tasks);
})