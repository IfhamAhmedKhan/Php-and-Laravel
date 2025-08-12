import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ message: "Please fill all the required fields", success: false });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            token: '' 
        });

        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message, success: false });
    }
};


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill the required field", success: false });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User does not exist", success: false });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password", success: false });
        }

       
        const accessToken = jwt.sign(
            { _id: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: "15m" }
        );

       
        const refreshToken = jwt.sign(
            { _id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        
        const salt = await bcrypt.genSalt(10);
        const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
        user.token = hashedRefreshToken;
        await user.save();

        
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,        
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        return res.status(200).json({
            message: "User login successful",
            success: true,
            token: accessToken
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message, success: false });
    }
};


export const getProfile = async (req, res) => {
    try {
        const user = req.user; 
        return res.status(200).json({
            message: "Profile fetched successfully",
            success: true,
            user: {
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message, success: false });
    }
};


export const refreshAccessToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({ message: "No refresh token found", success: false });
        }

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Verify the stored refresh token hash
        const isValidRefreshToken = await bcrypt.compare(token, user.token);
        if (!isValidRefreshToken) {
            return res.status(401).json({ message: "Invalid refresh token", success: false });
        }

        const newAccessToken = jwt.sign(
            { _id: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        return res.status(200).json({
            success: true,
            token: newAccessToken
        });

    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid or expired refresh token", success: false });
    }
};


