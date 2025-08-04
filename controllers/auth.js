const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = 'gstar_email-sender'
const User = require('../models/User')

exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return res.status(400).json({ message: "All fields are required" });

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return res.status(400).json({ message: "Invalid email format" });

    if (await User.findOne({email:email}))
        return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    let newuser = new User({ name, email, password: hashedPassword, role:'admin' });
    await newuser.save();
    return res.status(201).json({ message: "User registered successfully" });
}

// ✅ Signin
exports.signin=async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email:email});
    if (!user) return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Incorrect password" });

    const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: "2h" });
   let nuser = await User.findOne({email:email},{_id:0, name:1, role:1})
    return res.status(200).json({ message: "Login successful", token:token, user:nuser });
}

// ✅ Protected Route Example
exports.dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, jwtSecret);
        let user = await User.findOne({email:decoded.email}, {_id:0, name:1, role:1})
        return res.status(200).json({ message: "Welcome to dashboard", user: user });
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
