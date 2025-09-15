const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const userModel = require("../models/user.model");

const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const verifyEmail = await userModel.findOne({ email: email });

    try {
        if (verifyEmail) {
            return res.status(403).json({
                message: "email already used",
            });
        } else {
            //hashing password
            const hashedPassword = await bcrypt.hash(password, 10);
            const date = new Date();

            const user = new userModel({
                email: email,
                password: hashedPassword,
                createdAt: date,
            });

            const savedUser = await user.save();
            return res.status(201).json({
                message: "user successfully created !",
                result: savedUser,
                success: true,
            });
        }
    } catch {
        return res.status(412).send({
            success: false,
            message: error.message,
        });
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let getUser;

    //verifying that the user with the email exists
    const userExists = await userModel.findOne({ email: email });

    try {
        if (!userExists) {
            return res.status(401).json({
                message: "Authentication Failed",
            });
        }
        getUser = userExists;
        const passwordMatched = await bcrypt.compare(
            password,
            userExists.password
        );

        if (!passwordMatched) {
            return res.status(401).json({
                message: "Authentication Failed",
            });
        }
        let jwtToken = jwt.sign(
            {
                email: getUser.email,
                userId: getUser.id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        return res.status(200).json({
            accessToken: jwtToken,
            //keeping id to fetch contacts
            userId: getUser.id,
        });
    } catch (error) {
        return res.status(401).json({
            message: error.message,
            success: false,
        });
    }
});

module.exports = { register, login };
