const userModel = require("../models/user.model");
const contactModel = require("../models/contacts.model");
const asyncHandler = require("express-async-handler");

const getUser = async (userId) => {
    const user = await userModel.findById(userId);

    return user;
};

const getContacts = asyncHandler(async (req, res) => {
    const { userId } = req.userData;

    try {
        const user = await getUser(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const contacts = await contactModel.find({ userId: userId });

        return res.status(200).json({
            success: true,
            data: contacts,
            message: "Fetched all Contacts",
        });
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message,
        });
    }
});

const createContact = asyncHandler(async (req, res) => {
    const { userId } = req.userData;
    const { firstName, lastName, phoneNumber } = req.body;

    try {
        const user = await getUser(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const contact = new contactModel({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
        });

        const savedContact = await contact.save();
        return res.status(201).json({
            success: true,
            message: "Contact created",
            result: savedContact,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

const deleteContact = asyncHandler(async (req, res) => {
    const { userId } = req.userData;
    const contactId = req.params.contactId;
    try {
        const user = await getUser(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const contact = await contactModel.findOneAndDelete({
            _id: contactId,
            userId: userId,
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact deleted",
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

const updateContact = asyncHandler(async (req, res) => {
    const { userId } = req.userData;
    const contactId = req.params.contactId;

    try {
        const user = await getUser(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const updatedContact = await contactModel.findOneAndUpdate(
            { _id: contactId, userId: userId },
            req.body
        );
        if (!updatedContact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact updated",
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = { getContacts, createContact, deleteContact, updateContact };
