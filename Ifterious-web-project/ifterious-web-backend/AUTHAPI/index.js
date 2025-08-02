import "dotenv/config.js";

// Basic code to create server
import express from "express";
import { db } from "./db/db.js";

const app = express();
import userRoute from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";


// calling .env variable
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

// initial route
app.use("/api/user", userRoute);

db().then(()=> {
    // Start server at 8000 port 
    app.listen(PORT,()=>{
        console.log(`server is started at ${PORT}`)
    })

})

/*
controller function 
app.get("/", ()=> { // this "/" thing work is done inside userRoute.js

})

*/


