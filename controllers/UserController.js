import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const register = async (req, res) => {
    const {name, username, password, confPassword} = req.body;
    if(password !== confPassword){
        res.status(400).json({message: "Password not match"});
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    try{
        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username: username});
        if(!user){
            res.status(400).json({message: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            res.status(400).json({message: "Invalid password"});
        }
        const token = jwt.sign({username: user.username, id: user._id}, "test", {expiresIn: "1h"});
        res.status(200).json({result: user, token});
    }catch(error){
        res.status(409).json({ message: error.message });
    }

}

export const updateUser = async (req, res) => {
    const {name, username, password} = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
        const user = await User.findById(req.params.id);
        user.name = name;
        user.username = username;
        user.password = hashedPassword;
        await user.save();
        res.status(201).json(user);
    }
    catch(error){
        res.status(409).json({ message: error.message });
    }
}