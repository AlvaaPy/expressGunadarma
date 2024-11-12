import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ status: "Berhasil membuat akun", data: { userId: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ status: "fail", message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ status: 'fail', message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Simpan token di session
        req.session.token = token;

        res.redirect('/dashboard'); // Arahkan ke halaman dashboard
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};



const loginApi = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ status: "fail", message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ status: 'fail', message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ status: 'success', data: { token } });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};


const me = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ status: "fail", message: "User not found"});

        res.status(200).json({
            status: 'success',
            data: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
}


const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ status: 'fail', message: 'Could not log out' });
        }
        res.redirect('/login'); // Arahkan kembali ke halaman login
    });
};

export { register, login, me, logout, loginApi };
