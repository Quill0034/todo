import mongoose from 'mongoose';
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import PassportConfig from './src/config/PassportConfig';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import path from 'path'
import bcrypt from 'bcryptjs';

import User from './src/Model/User';
import { DatabaseUserInterface, UserInterface, TaskInterface } from './Interfaces/Interface';

import Route from './src/routes/Route'

dotenv.config()

// Middleware
const app = express();



app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(
    session ({
        secret: "secretcode",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
PassportConfig (passport);

app.use('/', Route)
  
// *********************************
mongoose.connect(
    `${process.env.MONGO_URI}`,
    //`${process.env.PART1STRING}${process.env.USERNAME}:${process.env.PASSWORD}${process.env.PART2STRING}`,
    {
 
    }
).then(() => console.log("MongoDB sucessfully connected!")).catch(err => console.log(err));
 
// // ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))


// // Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
    

const port = process.env.PORT || 5000; // process.env.port is Heroku's port
app.listen(port, () => console.log(`Server up and running on port ${port}`));



