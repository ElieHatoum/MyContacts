const asyncHandler = require("express-async-handler");
const {
    fetchAll,
    saveContact,
    removeContact,
    modifyContact,
} = require("../services/contacts.service");

const getContacts = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.userData;

        const contacts = await fetchAll(userId);

        return res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            sucess: false,
            message: error.message,
        });
    }
});

const createContact = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.userData;
        const { firstName, lastName, phoneNumber } = req.body;

        const savedContact = await saveContact(
            userId,
            firstName,
            lastName,
            phoneNumber
        );

        return res.status(201).json({
            success: true,
            message: "Contact created",
            result: savedContact,
        });
    } catch (error) {
        return res.status(error.statusCode || 500).send({
            success: false,
            message: error.message,
        });
    }
});

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.userData;
        const contactId = req.params.contactId;

        const deletedContact = await removeContact(userId, contactId);

        return res.status(200).json({
            success: true,
            message: "Contact deleted",
        });
    } catch (error) {
        return res.status(error.statusCode || 500).send({
            success: false,
            message: error.message,
        });
    }
});

const updateContact = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.userData;
        const contactId = req.params.contactId;

        const updatedContact = await modifyContact(userId, contactId, req.body);

        return res.status(200).json({
            success: true,
            message: "Contact updated",
        });
    } catch (error) {
        return res.status(error.statusCode || 500).send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = { getContacts, createContact, deleteContact, updateContact };
