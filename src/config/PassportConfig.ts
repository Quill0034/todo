import bcrypt from 'bcryptjs';
import passport from 'passport';
import passportLocal from 'passport-local';
import User from '../Model/User'
import { DatabaseUserInterface, UserInterface } from 'Interfaces/Interface';

const LocalStrategy = passportLocal.Strategy

export default function PassportConfig (passport : any) {

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

passport.serializeUser((user: DatabaseUserInterface, cb : any) => {
    cb(null, user._id);
});
passport.deserializeUser((id: string, cb : any) => {
    User.findOne({ _id: id}, (err: any, user : DatabaseUserInterface) => {
        const userInformation : UserInterface = {
            username: user.username,
            isAdmin: user.isAdmin,
            id: user._id
        };
        cb(err, userInformation);
    });
});
}