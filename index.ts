import mongoose from 'mongoose';
import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import PassportConfig from './src/config/PassportConfig';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import path from 'path'

import User from './src/config/Model/User';
import Todo from './src/config/Model/Todo';
import dotenv from 'dotenv';
import { DatabaseUserInterface, UserInterface } from './Interfaces/UserInterface';
// import UserRoute from './routes/UserRoute'
import bcrypt from 'bcryptjs';
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


//Routes
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


  //Todo route
  

  app.get('/todos', async (req, res) => {
      const todos = await Todo.find({'complete': false});

      res.send(todos);
  })

  app.get('/done', async (req, res) => {
    const done = await Todo.find({'complete': true});

    res.send(done);
})

  app.post('/todo', (req, res) => {
      const todo = new Todo({
          task: req.body.task
      });

      todo.save();
      res.send("add task successfully")
    //   res.send(todo)
  })

  app.delete('/todo/:id', async (req, res) => {
      const result = await Todo.findByIdAndDelete(req.params.id);
    // Todo.findByIdAndDelete(req.params.id);
      
    //   res.send(result);
      res.send("delete task successfully")
  })



  app.put('/todo/:id', async(req, res) => {
      const todo = await Todo.findById(req.params.id);

      todo.complete = !todo.complete
      todo.save();
    //   res.send(todo)
    res.send("task completed");
  })


  

//   app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
//   });
  
// *********************************
//mongodb+srv://quytodo:08100810@todoapp.dxoug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `${process.env.MONGO_URI}`,
    //`${process.env.PART1STRING}${process.env.USERNAME}:${process.env.PASSWORD}${process.env.PART2STRING}`,
    {
 
    }
).then(() => console.log("MongoDB sucessfully connected!")).catch(err => console.log(err));



// if (process.env.NODE_ENV) {
//     //static folder add
//      app.use(express.static('app/client/build'));
//      app.get("*", function (req, res) {
//      res.sendFile(path.resolve(__dirname , "app/client/build", "index.html"));
//       });
//     }

 
// // ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))


// // Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
    

const port = process.env.PORT || 5000; // process.env.port is Heroku's port
app.listen(port, () => console.log(`Server up and running on port ${port}`));





function item(item: any, arg1: (any: any) => void) {
    throw new Error('Function not implemented.');
}
