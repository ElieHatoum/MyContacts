const userModel = require("../models/user.model");
const contactModel = require("../models/contacts.model");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const getUser = async (userId) => {
    const user = await userModel.findOne({ userId: userId });

    return user;
};

const allContacts = asyncHandler(async (req, res) => {
    const { userId } = req.userData;

    try {
        const user = await getUser(userId);

        if (!user) {
            return res.status(403).json({
                message: "user not found",
                success: false,
            });
        }

        const contacts = await contactModel.find({ userId: userId });

        return res.status(200).json({
            data: contacts,
            message: "fetched all Contacts",
        });
    } catch (error) {
        return res.status(401).json({
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
            return res.status(403).json({
                message: "user not found",
                success: false,
            });
        }
        const contactId = uuidv4();
        const contact = new contactModel({
            contactId: contactId,
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
        });

        const savedContact = await contact.save();
        return res.status(201).json({
            message: "contact successfully created !",
            result: savedContact,
            success: true,
        });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message,
        });
    }
});

const deleteContact = asyncHandler(async (req, res) => {
    const userId = req.userData.userId;
    const contactId = req.params.contactId;
    try {
        const user = await getUser(userId);
        if (!user) {
            return res.status(403).json({
                message: "user not found",
                success: false,
            });
        }

        const contact = await contactModel.findOneAndDelete({
            contactId: contactId,
            userId: userId,
        });

        if (!contact) {
            return res.status(403).json({
                message: "Contact not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Contact deleted.",
            success: true,
        });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = { allContacts, createContact, deleteContact };
