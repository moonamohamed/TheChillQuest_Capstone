import express from 'express';
import Task from '../model/task.js';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authMiddleware = (req, res, next) => {
    try{
        const authHeader = req.headers.authorization;
    if(!authHeader) 
        return res.status(401).json({message: 'Missing Authorization Header'});
    

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: decoded.id};
        next();
    } catch(error) {
        res.status(401).json({message: 'Unauthorized. Token invalid or expired.'});
    }
};

const calculateLevel = (xp) => Math.floor(xp/100) + 1;

router.get('/', authMiddleware, async (req, res) => {
    try{
        const tasks = await Task.find({user: req.user.id});
        res.json(tasks);
    } catch(error) {
        res.status(400).json({message: 'Failed to fetch tasks'});
    }
});

router.post('/', authMiddleware, async(req,res)=>{
    try {
         const {text} =req.body;
        if(!text || text.trim().length < 1) {
            return res.status(400).json({message: 'Task text is required'})
        }

        const task = new Task({text, user: req.user.id, completed: false
        });

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.log('Error creating task:', error.message)
        res.status(500).json({message: 'Failed to create task'});
    }
});

router.patch('/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id, user: req.user.id});
        if(!task) return res.status(404).json({message: 'Task not found or unauthorized'});
        
        task.completed = !task.completed
        await task.save()
     
        res.json(task)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Failed to update task'});
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try{
    const task = await Task.findOneAndDelete({_id: req.params.id, user: req.user.id});
    if(!task) return res.status(404).json({message: 'Task not found or unauthorized'});
    
    res.status(204).end();
    } catch(error) {
        res.status(500).json({message: 'Failed to delete task'});
    }
});

router.patch('/:id/complete', authMiddleware, async (req, res) => {
    try{
        const task = await Task.findOne({_id: req.params.id, user: req.user.id});
        if (!task) return res.status(404).json({message: 'Task not found'});

        if(!task.completed){
        task.completed = true;
        task.completedAt = new Date();
        
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
    } else {
        const user = await User.findById(req.user.id);
        return res.json({message: 'Task was already completed.', xp: user.xp, level: user.level});
    } 
} catch(error) {
        res.status(500).json({error: error.message});
    }
});

export default router;
