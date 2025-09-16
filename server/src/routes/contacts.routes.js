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
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 64f9f1c2e3f1b3f4c2a0b1d2
 *                       firstName:
 *                         type: string
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         example: Doe
 *                       phoneNumber:
 *                         type: string
 *                         example: 1234567891012
 *                       userId:
 *                         type: string
 *                         example: 64f9f1c2e3f1b3f4c2a0b1d2
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
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
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               phoneNumber:
 *                 type: string
 *                 example: 11121344667788
 *     responses:
 *       201:
 *         description: Contact created
 *       403:
 *         description: User not found
 *       412:
 *         description: Validation error
 *       500:
 *         description: Server error
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
 *         description: Contact deleted
 *       403:
 *         description: User or contact not found
 *       412:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.delete("/contacts/:contactId", verifyToken, deleteContact);

/**
 * @swagger
 * /api/contacts/{contactId}:
 *   patch:
 *     summary: Update a contact information by ID
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
 *         description: Contact updated
 *       403:
 *         description: User or contact not found
 *       412:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.patch("/contacts/:contactId", verifyToken, updateContact);

module.exports = router;
