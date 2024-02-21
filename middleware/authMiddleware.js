const jwt = require('jsonwebtoken');
const secretKey = 'Rahman@1234';
const httpStatusCode = require('../constant/httpStatusCode');

async function getToken(req, res) {
    const user = req.body;
    const token = await jwt.sign({ user }, secretKey, { expiresIn: '1h' });

    return token;
}

async function verifyToken(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized: Token not provided' });
    }

    try {
        // Split the authorization header by space and directly use the token
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded.user;
        console.log(req.user)
        console.log("token:", token);
        console.log("secreate key:", secretKey)
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(httpStatusCode.UNAUTHORIZED).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
}

module.exports = {
    getToken,
    verifyToken
}