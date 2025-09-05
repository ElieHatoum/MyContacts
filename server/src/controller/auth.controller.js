const express = require("express");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const userModel = require("../models/user.model");

const asyncHandler = require("express-async-handler");

const { v4: uuidv4 } = require("uuid");

const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const verifyEmail = await userModel.findOne({ email: email });

    try {
        if (verifyEmail) {
            return res.status(403).json({
                message: "email already used",
            });
        }
        //generating id
        const userId = uuidv4();
        //hashing password
        bcrypt.hash(password, 10).then((hash) => {
            const user = new userModel({
                userId: userId,
                email: email,
                password: hash,
            });

            user.save()
                .then((response) => {
                    return res.status(201).json({
                        message: "user successfully created !",
                        result: response,
                        success: true,
                    });
                })
                .catch((error) => {
                    return res.status(500).json({
                        error: error,
                    });
                });
        });
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
    userModel
        .findOne({
            email: email,
        })
        .then((user) => {
            if (!user) {
                //user does not exist
                return res.status(401).json({
                    message: "Authentication Failed",
                });
            }

            getUser = user;

            return bcrypt.compare(password, user.password);
        })
        .then((response) => {
            if (!response) {
                return res.status(401).json({
                    message: "Authentication Failed",
                });
            } else {
                let jwtToken = jwt.sign(
                    {
                        email: getUser.email,
                        userId: getUser.userId,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "1h",
                    }
                );
                return res.status(200).json({
                    accessToken: jwtToken,
                    //keeping id to fetch contacts
                    userId: getUser.userId,
                });
            }
        })
        .catch((err) => {
            return res.status(401).json({
                messgae: err.message,
                success: false,
            });
        });
});

const home = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const verifyUser = await userModel.findOne({ userId: id });
        if (!verifyUser) {
            return res.status(403).json({
                message: "user not found",
                success: false,
            });
        } else {
            return res.status(200).json({
                message: `user ${verifyUser.email}`,
                success: true,
            });
        }
    } catch (error) {
        return res.status(401).json({
            sucess: false,
            message: error.message,
        });
    }
});

module.exports = { register, login, home };
