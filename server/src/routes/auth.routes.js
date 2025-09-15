const express = require("express");

const router = express.Router();

const {
    registerValidation,
    loginValidation,
} = require("../middleware/authvalidation.middleware");

const { login, register } = require("../controller/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user management
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123!"
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user successfully created !
 *                 result:
 *                   type: object
 *                 success:
 *                   type: boolean
 *       403:
 *         description: Email already used
 *       412:
 *         description: Validation or database error
 */

router.post("/register", registerValidation, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "StrongPassword123!"
 *     responses:
 *       200:
 *         description: Successful login, returns token and userId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 userId:
 *                   type: string
 *                   example: "b23a8c3c-27c5-4d54-bf79-b302ef6d30d7"
 *       401:
 *         description: Authentication failed
 */

router.post("/login", loginValidation, login);

module.exports = router;
