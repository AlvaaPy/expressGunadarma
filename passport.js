import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/userModels.js';

const GOOGLE_CLIENT_ID = "YOUR_CLIENT_ID";
const GOOGLE_CLIENT_SECRET = "YOUR_CLIENT_SECRET";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    const userData = {
      googleId: profile.id,
      name: profile.displayName, 
      email: profile.emails[0].value 
    };

    try {
      const user = await User.findOrCreate(userData); 
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
));



// Serialize and deserialize user
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function(id, cb) {
    try {
      const user = await User.findById(id); 
      cb(null, user);
    } catch (err) {
      cb(err); 
    }
  });
  
