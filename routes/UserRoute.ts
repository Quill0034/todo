import express, {NextFunction, Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import passport from 'passport';


import User from '../src/config/Model/User'


import { DatabaseUserInterface, UserInterface } from 'Interfaces/Interface';

const app = express()

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

  export default app;