import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from '../models/user.js';


const router = express.Router();

router.post('/register', async (requestAnimationFrame, res) => {
    const {username, password} = req.body;
    const existingUser = await User.findById({username});
    if (existingUser) return res.status(400).json({message: 'Username already exists'});

    const hash = await bcrypt.hash(password, 10);
    const user = new User({username, password: hash});
    await user.save();
    res.status(201).json({message: 'User registered'});
});