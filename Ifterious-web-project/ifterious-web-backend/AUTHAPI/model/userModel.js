import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    // Making attributes the fields we want in our login page
    name:{
        type: String,
        unique: true
    },

    email:{
        type: String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
}, {timestamps: true}); //timestamps store current data on which dataset was created

export default mongoose.model("user",userSchema)

