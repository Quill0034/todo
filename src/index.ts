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

dotenv.config()

const LocalStrategy = passportLocal.Strategy

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

//Passport
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err: any, user : any) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
})
);

passport.serializeUser((user: any, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id: string, cb) => {
    User.findOne({ _id: id}, (err: any, user : any) => {
        const userInformation = {
            username: user.username,
            isAdmin: user.isAdmin,
            id: user._id
        };
        cb(err, userInformation);
    });
});

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
                password: hashedPassword,
                isAdmin: true
            });
            await newUser.save();
            res.send("success")
        }
    })
});

app.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("success")
});

app.get("/user", (req, res) => {
    res.send(req.user);
})

app.get("/logout", (req, res) => {
    req.logout();
    res.send("sucess")
} )

app.post("/deleteuser", async (req, res) => {
    const {id} = req.body;
    await User.findByIdAndDelete(id, (err : Error) => {
        if (!err) {
            res.send("success")
        } else {
            throw err;
        }
    }).clone().catch(function(err){ console.log(err)})
    
})

app.get("/getallusers", async (req, res) => {
     await User.find({}, (err : Error, data : UserInterface[]) => {
        if (!err) {
            const filteredUsers : any = [];
        data.forEach((item : any) => {
            const userInformation = {
                id: item._id,
                username: item.username,
                isAdmin: item.isAdmin
            }
            filteredUsers.push(userInformation)
        });
        res.send(filteredUsers);
        } else{
        throw err;
    }
        
    }).clone().catch(function(err){ console.log(err)})
})

 
// *********************************
//mongodb+srv://quytodo:08100810@todoapp.dxoug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `${process.env.MONGO_URI}`,
    {
 
    }
).then(() => console.log("MongoDB sucessfully connected!")).catch(err => console.log(err));

const port = process.env.PORT || 5000; // process.env.port is Heroku's port
app.listen(port, () => console.log(`Server up and running on port ${port}`));

function item(item: any, arg1: (any: any) => void) {
    throw new Error('Function not implemented.');
}
