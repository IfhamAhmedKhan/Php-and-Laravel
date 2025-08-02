import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login = async (req, res) => {
    try {
        const {email, password } = req.body;

        // checking if user is missing any field
        if (!email || !password) {
            return res.send({ 
                message: "please fill the required field", 
                success: false,
             });
        }

        const checkexistuser = await userModel.findOne({email});

        if(!checkexistuser){
            return res.send({message:"user does not exist", success:false})
        }

        const checkpassword = await bcrypt.compare(password, checkexistuser.password);

        if(!checkpassword){
            return res.send({message: "password is incorrect", success:false})
        }

        const token = await jwt.sign({id:checkexistuser._id}, process.env.TOKEN_SECRET)

        if(!token){
            return res.send({message: "token is not created", success:false})
        }

        return res.cookie("token",token, {
            httpOnly:true
        }).send({message: "user login successful", success:true})



    } catch (error) {
console.log(error);
        return res.send({message: error.message, success:false})
    }
}

export const Signup = async (req, res) => {

    //console.log(req.body)
    try {
        const { name, email, password } = req.body;

        // checking if user is missing any field
        if (!email || !name || !password) {
            return res.send({ 
                message: "please fill the required field", 
                success: false,
             });
        }

        // checking if the user already exist
        const checkexistuser = await userModel.findOne({email});
        if(checkexistuser){
            return res.send({message: "user already exist", success:false})
        }

        const salt = await bcrypt.genSalt(10)
        // using bcrypt to store encrypted password
        const hashpassword = await bcrypt.hash(password,salt)

        // creating new user
        const newuser = new userModel({
            name,
            email,
            password: hashpassword
        })

        await newuser.save();

        // created token for user
        const token = await jwt.sign({_id:newuser._id}, process.env.TOKEN_SECRET)

        console.log(token)

        if(!token){
            return res.send({message: "token is not created", success:false})
        }

        return res.cookie("token",token, {
            httpOnly:true
        }).send({message: "user created successfully", success:true})

    } catch (error) {
        console.log(error);
        return res.send({message: error.message, success:false})
    }
}