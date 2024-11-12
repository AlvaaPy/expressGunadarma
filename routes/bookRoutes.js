import express from "express";
import {
  create,
  destroy,
  getAllBooksPage,
  index,
  indexID,
  update,
} from "../controllers/bookControllers.js";
import { login, loginApi, logout, register } from "../controllers/userControllers.js";
import protect from "../middleware/userMiddleware.js";
import passport from "passport";
import jwt  from "jsonwebtoken";

const router = express.Router();

// POST
router.post("/book", protect, create);
// Get
router.get("/book", protect, index);
// Get iD
router.get("/book/:id", protect, indexID);

// Update
router.put("/book/:id", protect, update);

//Delete
router.delete("/book/:id", protect, destroy);

router.get("/dashboard", protect, getAllBooksPage);

// Login API
router.post("/login", loginApi);

// Register
router.post("/register", register);


// AUTH API


router.get('/login', (req, res) => {
  res.render('login')
})

router.post("/login", login);



router.get('/dashboard', protect, (req, res) => {
  res.render('dashboard', { user: req.user }); 
});


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    // Jika login berhasil, buat token JWT untuk pengguna
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Simpan token di session
    req.session.token = token;

    // Redirect ke dashboard
    res.redirect('/dashboard');
  }
);

router.post('/logout', logout);

export default router;
