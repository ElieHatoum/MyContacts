const express = require("express");

const router = express.Router();

const {
    allContacts,
    createContact,
    deleteContact,
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

router.get("/contacts", verifyToken, allContacts);
router.post("/contacts", verifyToken, createContact);
router.delete("/contacts/:contactId", verifyToken, deleteContact);

module.exports = router;
