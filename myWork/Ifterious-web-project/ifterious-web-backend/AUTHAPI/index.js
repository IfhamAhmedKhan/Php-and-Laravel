import "dotenv/config.js";
import express from "express";
import { db } from "./db/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// create server
const app = express();
import userRoute from "./routes/userRoutes.js"

// calling .env variable
const PORT = process.env.PORT || 3000;

// CORS configuration
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json())
app.use(cookieParser())

// initial route
app.use("/api/user", userRoute);

db().then(()=> {
    // start server at 8000 port 
    app.listen(PORT,()=>{
        console.log(`server is started at ${PORT}`)
    })

})

/*
controller function 
app.get("/", ()=> { // this "/" thing work is done inside userRoute.js

})

*/

