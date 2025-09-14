const express = require("express");
const router = express.Router();

const {
    getContacts,
    createContact,
    deleteContact,
    updateContact,
} = require("../controller/contacts.controller");

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
const verifyToken = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts for the authenticated user
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all contacts
 *       403:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 */
router.get("/contacts", verifyToken, getContacts);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact successfully created
 *       403:
 *         description: User not found
 *       412:
 *         description: Validation or server error
 */
router.post("/contacts", verifyToken, createContact);

/**
 * @swagger
 * /api/contacts/{contactId}:
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact successfully deleted
 *       403:
 *         description: User or contact not found
 *       412:
 *         description: Validation or server error
 */
router.delete("/contacts/:contactId", verifyToken, deleteContact);

/**
 * @swagger
 * /api/contacts/{contactId}:
 *   patch:
 *     summary: Update a contact by ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contactId
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact successfully updated
 *       403:
 *         description: User or contact not found
 *       412:
 *         description: Validation or server error
 */
router.patch("/contacts/:contactId", verifyToken, updateContact);

module.exports = router;
