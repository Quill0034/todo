import mongoose from 'mongoose';
import express, {Request, Response} from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './User';
import dotenv from 'dotenv';
import { UserInterface } from './Interfaces/UserInterface';





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

// Routes
app.post('/register', async (req: Request,res: Response) => {
    const { username, password } = req?.body;
    if (!username || !password || typeof username !== "string" || typeof password !== "string" ) {
        res.send("improper values");
        return;
    }
    User.findOne({username} , async (err : Error, doc : UserInterface) => {
        if (err) throw err;
        if(doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User ({
                username,
                password: hashedPassword
            });
            await newUser.save();
            res.send("successfully created new user")
        }
    })
});


mongoose.connect(
    "mongodb+srv://quytodo:08100810@todoapp.dxoug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        
    }
).then(() => console.log("MongoDB sucessfully connected!")).catch(err => console.log(err));

const port = process.env.PORT || 5000; // process.env.port is Heroku's port
app.listen(port, () => console.log(`Server up and running on port ${port}`));