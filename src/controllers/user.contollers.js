const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const registration = async (req, res)=> {
    const {fullName, email, password} = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message: "All fields are required"});
        }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists"});
        }
        // hash the password before saving to database
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ fullName, email, password: hashedPassword});
        // do not return password in thr response
        const userResponse = {
            id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email
        };

        return res.status(201).json({message: "User created successfully", user: userResponse});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
        
    }
};

const login = async (req, res) => {
    const { email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({message: "Email and password are required"});
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({message: "Invalid email or password"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});

        }
        const token = jwt.sign( {id: user._id, fullname: user.fullName}, process.env.JWT_SECRET, { expiresIn: "1h"});
        // do not return password in thr response
        const userResponse = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: token
        };


        return res.status(200).json({message:"User logged in successfully", userResponse , token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
        
    }
};

const makeAdmin = async (req, res ) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found"});
        }
        user.role = "admin";
        await user.save();
        return res.status(200).json({ message: "User role updated to admin"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error"});
        
    }
};

const getUsers = async (req, res) => {
    //const isAdmin = req.user.role !== "admin";
    try {
        const users = await User.find().select("-password");
        return res.status(200).json({ users });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
        
        
    };
}


module.exports = {
    registration,
    login,
    makeAdmin,
    getUsers
};

