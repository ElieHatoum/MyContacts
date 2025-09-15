const userModel = require("../models/user.model");
const contactModel = require("../models/contacts.model");

const getUser = async (userId) => {
    const user = await userModel.findById(userId);

    return user;
};

const fetchAll = async (userId) => {
    const user = await getUser(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const contacts = await contactModel.find({ userId: userId });

    return contacts;
};

const saveContact = async (userId, firstName, lastName, phoneNumber) => {
    const user = await getUser(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const contact = new contactModel({
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
    });

    const savedContact = await contact.save();

    return savedContact;
};

const removeContact = async (userId, contactId) => {
    const user = await getUser(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const deletedContact = await contactModel.findOneAndDelete({
        _id: contactId,
        userId: userId,
    });

    if (!deletedContact) {
        const error = new Error("Contact not found");
        error.statusCode = 404;
        throw error;
    }

    return deletedContact;
};

const modifyContact = async (userId, contactId, update) => {
    const user = await getUser(userId);
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    const updatedContact = await contactModel.findOneAndUpdate(
        { _id: contactId, userId: userId },
        update
    );

    if (!updatedContact) {
        const error = new Error("Contact not found");
        error.statusCode = 404;
        throw error;
    }

    return updatedContact;
};

module.exports = { fetchAll, saveContact, removeContact, modifyContact };
