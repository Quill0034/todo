import mongoose from 'mongoose';
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import passport from 'passport';
import passportLocal from 'passport-local';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bcrypt from 'bcryptjs';
import User from './User';
import dotenv from 'dotenv';
import { DatabaseUserInterface, UserInterface } from './Interfaces/UserInterface';

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
passport.use(new LocalStrategy((username : string, password : string, done) => {
    User.findOne({ username: username }, (err: any, user : DatabaseUserInterface) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result : boolean) => {
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

passport.serializeUser((user: DatabaseUserInterface, cb) => {
    cb(null, user._id);
});
passport.deserializeUser((id: string, cb) => {
    User.findOne({ _id: id}, (err: any, user : DatabaseUserInterface) => {
        const userInformation : UserInterface = {
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
    User.findOne({username} , async (err : Error, doc : DatabaseUserInterface) => {
        if (err) throw err;
        if(doc) res.send("User Already Exists");
        if (!doc) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User ({
                username,
                password: hashedPassword,

            });
            await newUser.save();
            res.send("success")
        }
    })
});

const isAdministratorMiddleware = ( req : Request, res : Response, next: NextFunction) => {
    const { user } : any = req;
    if(user) {
        User.findOne({ username: user.username }, (err : any, doc: DatabaseUserInterface) => {
            if (err) throw err;
            if (doc?.isAdmin) {
                next();
            }
            else {
                res.send ("Sorry, only admin's can do this")
            }
        })
    }
    else {
        res.send("Sorry, you aren't logged in")
    }
} 
 
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

app.post("/deleteuser", isAdministratorMiddleware, async (req, res) => {
    const {id} = req?.body;
    await User.findByIdAndDelete(id, (err : any) => {
        if (!err) {
            res.send("success")
        } else {
            throw err;
        }
    }).clone().catch(function(err){ console.log(err)})
    
})

// app.get("/getallusers",isAdministratorMiddleware, async (req, res) => {
//      await User.find({}, (err, data : DatabaseUserInterface[]) => {
//         if (!err) {
//             const filteredUsers : UserInterface = [];
//         data.forEach((item : DatabaseUserInterface) => {
//             const userInformation = {
//                 id: item._id,
//                 username: item.username,
//                 isAdmin: item.isAdmin
//             }
//             filteredUsers.push(userInformation)
//         });
//         res.send(filteredUsers);
//         } else{
//         throw err;
//     }
        
//     }).clone().catch(function(err){ console.log(err)})
// })

app.get("/getallusers", isAdministratorMiddleware, async (req, res) => {
    await User.find({}, (err, data: DatabaseUserInterface[]) => {
      if (err) throw err;
      const filteredUsers: UserInterface[] = [];
      data.forEach((item: DatabaseUserInterface) => {
        const userInformation = {
          id: item._id,
          username: item.username,
          isAdmin: item.isAdmin
        }
        filteredUsers.push(userInformation);
      });
      res.send(filteredUsers);
    }).clone().catch(function(err){ console.log(err)})
  });
  




// *********************************
//mongodb+srv://quytodo:08100810@todoapp.dxoug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `${process.env.MONGO_URI}`,
    //`${process.env.PART1STRING}${process.env.USERNAME}:${process.env.PASSWORD}${process.env.PART2STRING}`,
    {
 
    }
).then(() => console.log("MongoDB sucessfully connected!")).catch(err => console.log(err));

const port = process.env.PORT || 5000; // process.env.port is Heroku's port
app.listen(port, () => console.log(`Server up and running on port ${port}`));

function item(item: any, arg1: (any: any) => void) {
    throw new Error('Function not implemented.');
}
