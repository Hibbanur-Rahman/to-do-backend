const bcrypt = require("bcrypt");
const httpStatusCode = require('../constant/httpStatusCode');
const UserModel = require('../models/userModel');

const UserRegister = async (req, res) => {
    try {
        const { username, email, password, phone } = req.body;
        if (!username || !email || !password || !phone) {
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success: false,
                message: "all fields are required",
            });
        }

        const existingUser = await UserModel.findOne({
            $or: [{ email }, { phone }]
        });

        if (existingUser) {
            return res.status(httpStatusCode.CONFLICT).json({
                success: false,
                message: "User is already registered with this email or phone. Please sign in.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            phone
        });

        if (user) {
            return res.status(httpStatusCode.OK).json({
                success: true,
                message: "User registered successfully!",
                data: user
            });
        }

    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error.message,
        });
    }
};

module.exports = {
    UserRegister,
};
