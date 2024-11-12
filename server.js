import express  from "express";
import dotenv from "dotenv";
import ConnectDb from "./config/Database.js";
import router from "./routes/bookRoutes.js";
import session from "express-session";
import passport from "passport";
import cors from 'cors';
import './passport.js';



dotenv.config()

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false}
}));

app.use(passport.initialize()); // Inisialisasi Passport
app.use(passport.session()); // Gunakan session Passport

app.set('view engine', 'ejs');
app.set('views', './views')

app.use('/', router)

ConnectDb();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})