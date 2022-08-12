
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import PassportConfig from '../config/PassportConfig';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import User from '../Model/User';
import TodoModel from '../Model/Todo';
import MessageModel from '../Model/Message';

import { DatabaseUserInterface, UserInterface, TaskInterface, MessageInterface } from '../../Interfaces/Interface';

// import UserRoute from './routes/UserRoute'
import bcrypt from 'bcryptjs';

var router = express.Router();

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


// User Routes
router.post('/register', async (req: Request,res: Response) => {
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
 
router.post("/login", passport.authenticate("local"), (req, res) => {
    res.send("success")
});

router.get("/user", (req, res) => {
    res.send(req.user);
})

router.get("/logout", (req, res) => {
    req.logout();
    res.send("sucess")
} )

router.post("/deleteuser", isAdministratorMiddleware, async (req, res) => {
    const {id} = req?.body;
    await User.findByIdAndDelete(id, (err : any) => {
        if (!err) {
            res.send("success")
        } else {
            throw err;
        }
    }).clone().catch(function(err){ console.log(err)})
    
})


router.get("/getallusers", isAdministratorMiddleware, async (req, res) => {
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

// Todo Route

router.get('/todos', async (req,res) => {
    const Todo = await TodoModel.find({'complete': false});
   res.send(Todo);
})

router.get('/done', async (req,res) => {
   const Done = await TodoModel.find({'complete': true});
  res.send(Done);
})

router.post('/addTodo', async (req, res) => {
   const { text } : any = req.body;

   TodoModel
   .create({text})
   .then(() => res.send("Added Successfully..."))
   .catch((err) => console.log(err))
})

router.post('/deleteTodo', async (req,res) => {
   const {_id} = req.body;

   TodoModel
   .findByIdAndDelete(_id)
   .then(() => res.send("Deleted Successfully..."))
   .catch((err) => console.log(err))
 })

 router.post('/updateTodo', async (req, res) => {
   const {_id, text} : TaskInterface = req.body;

   TodoModel
   .findByIdAndUpdate(_id, {text})
   .then(() => res.send("Updated Successfully..."))
   .catch((err) => console.log(err))
 })


 router.put('/completeTodo', async(req, res) => {
   const {_id} = req.body;
   const todo = await TodoModel.findById(_id);
    
      todo.complete = !todo.complete
   todo.save();
   //   res.send(todo)
     res.send("Updated Successfully!");
    })

// Communication Route
router.post('/addMessage', async (req, res) => {
    const { message } : any = req.body;
 
    MessageModel
    .create({message})
    .then(() => res.send("Added Successfully..."))
    .catch((err) => console.log(err))
 })

router.get('/messageBoard', async ( req, res) => {
    const Message = await MessageModel.find();
    res.send(Message)
})

 router.post("/deleteMessage", isAdministratorMiddleware, async (req, res) => {
    const {id} = req?.body;
    await MessageModel.findByIdAndDelete(id, (err : any) => {
        if (!err) {
            res.send("success")
        } else {
            throw err;
        }
    }).clone().catch(function(err){ console.log(err)})
    
})

  export default router 