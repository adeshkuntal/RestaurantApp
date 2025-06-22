const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send("No token. Unauthorized.");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).send("Invalid token. User not found.");
        }

        req.user = user;
        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err);
        return res.status(401).send("Authentication failed.");
    }
};



exports.adminOnly = (req,res,next) => {
    if (req.user.role !== "admin") return res.send("Access denied");
    next();
}