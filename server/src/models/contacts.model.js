const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    userId: { type: String, immutable: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: {
        type: String,
        match: [/^[0-9]+$/, "Phone number should only contain digits"],
        minLength: [10, "Phone number should have 10 to 20 digits"],
        maxLength: [20, "Phone number should have10 to 20 digits"],
    },
});

module.exports = mongoose.model("Contact", contactSchema);
