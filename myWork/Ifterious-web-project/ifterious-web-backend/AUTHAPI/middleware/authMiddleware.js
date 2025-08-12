import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

// middleware to verify JWT token
export const verifyToken = async (req, res, next) => {
    try {
        // getting token from authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({message: "access denied and no token provided.",success: false});
        }

        // extracting token from bearer <token>
        const token = authHeader.substring(7);

        if (!token) {
            return res.status(401).json({message: "access denied and no token provided.", success: false});
        }

        // verifying the token
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decoded) {
            return res.status(401).json({message: "invalid token.", success: false});
        }

        // finding user by ID from token
        const user = await userModel.findById(decoded.id || decoded._id).select('-password');
        if (!user) {
            return res.status(404).json({message: "user not found.", success: false});
        }
        // adding user info to request object
        req.user = user;
        next();

    } catch (error) {
        console.log("auth middleware error:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({message: "invalid token.",success: false});
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({message: "token expired.",success: false});
        }
        // application error / internal server error
        return res.status(500).json({message: "internal server error.",success: false});
    }
};

