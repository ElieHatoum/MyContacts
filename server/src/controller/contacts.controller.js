const userModel = require("../models/user.model");
const contactModel = require("../models/contacts.model");
const asyncHandler = require("express-async-handler");

const getUser = async (userId) => {
    // const user = await userModel.findOne({ id: userId });
    const user = await userModel.findById(userId);

    return user;
};

const getContacts = asyncHandler(async (req, res) => {
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

        const contact = new contactModel({
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
    const { userId } = req.userData;
    const contactId = req.params.contactId;
    try {
        const user = await getUser(userId);
        if (!user) {
            return res.status(403).json({
                message: "user not found",
                success: false,
            });
        }

        const contact = await contactModel.findByIdAndDelete(contactId);

        if (!contact) {
            return res.status(403).json({
                message: "contact not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "contact deleted.",
            success: true,
        });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message,
        });
    }
});

const updateContact = asyncHandler(async (req, res) => {
    const { userId } = req.userData;
    const contactId = req.params.contactId;

    try {
        const user = getUser(userId);
        if (!user) {
            return res.status(403).json({
                message: "user not found",
                success: false,
            });
        }

        const updatedContact = await contactModel.findByIdAndUpdate(
            contactId,
            req.body
        );
        if (!updatedContact) {
            return res.status(403).json({
                message: "contact not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "contact updated.",
            success: true,
        });
    } catch (error) {
        return res.status(412).send({
            success: false,
            message: error.message,
        });
    }
});

module.exports = { getContacts, createContact, deleteContact, updateContact };
