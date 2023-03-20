const User = require("../api/models/user.model");
const { verifyToken } = require("../utils/token");
const setError = require("../utils/error");
const dotenv = require("dotenv");
dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return next(setError(401, "Unauthorized"));
        }
        const parsedToken = token.replace("Bearer ", "");
        const validToken = verifyToken(parsedToken, process.env.JWT_SECRET);
        if (!validToken) {
            return next(setError(401, "Unauthorized"));
        }
        const user = await User.findById(validToken.id);
        user.password = null;
        req.user = user;
        next();
    } catch (error) {
        return next(setError(401, "Unauthorized"));
    }
};

module.exports = auth;