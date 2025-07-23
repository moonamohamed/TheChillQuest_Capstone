import express from 'express';
import Task from '../model/task.js';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
    if(!authHeader) 
        throw new Error('Missing Authorization Header');

        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.id};
        next();
    } catch(error) {
        res.status(401).json({message: 'Unauthorized. Token invalid or expired.'});
    }
};

const calculateLevel = (xp) => Math.floor(xp/100) + 1;

router.get('/user/:userId', async (req, res) => {
    try{
        const tasks = await Task.find({user: req.params.userId});
        res.json(tasks);
    } catch(error) {
        console.log(error);
        res.status(400).json({message: 'Failed to fetch tasks'});
    }
});

router.post('/', async(req,res)=>{
    console.log(req.body)
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error.message)
    }
});

router.patch('/:id', async (req, res) => {
    try {
        console.log(' PATCH /tasks/:id')
        const task = await Task.findById(req.params.id)
        task.completed = !task.completed
        await task.save()
        console.log(task)
        res.json(task)
    } catch (e) {
        console.log(e)
        res.json(e)
    }
});

router.delete('/:id', async (req, res) => {
    try{
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).end();
    } catch(error) {
        res.status(500).json({message: 'Failed to delete task'});
    }
});

router.patch('/:id/complete', authMiddleware, async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if (!task)
            return res.status(404).json({message: 'Task not found'});

        task.completed = true;
        await task.save();

        const user = await User.findById(req.user.id);
        user.xp += 10;
        user.level = calculateLevel(user.xp);
        await user.save();

        res.json({
            message: 'Task completed! XP awarded.',
            xp: user.xp,
            level: user.level
        });
    } catch(error) {
        res.status(500).json({error: error.message});
    }
});

export default router;
