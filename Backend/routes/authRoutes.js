import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';


const router = express.Router();

router.post('/register', async (requestAnimationFrame, res) => {
    const {username, password} = req.body;
    const existingUser = await User.findById({username});
    if(existingUser) return res.status(400).json({message: 'Username already exists'});

    const hash = await bcrypt.hash(password, 10);
    const user = new User({username, password: hash});
    await user.save();
    res.status(201).json({message: 'User registered'});
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findById({username});
    if(!user) return res.status(401).json({message: 'invalid credentials'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(401).json({message: 'invalid credentials'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: 'id'});
    res.json({token, user: {id: user._id, username: user.username} });
});

export default router;