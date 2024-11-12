import jwt from "jsonwebtoken";
import User from "../models/userModels.js";

const protect = async (req, res, next) => {
    let token = req.session?.token || req.headers.authorization?.split(" ")[1]; // Ambil dari session atau header

    if (!token) {
        return res.status(401).json({ status: 'fail', message: 'You are not logged in!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ status: 'fail', message: 'User no longer exists.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ status: 'fail', message: 'Invalid token' });
    }
};


export default protect;
