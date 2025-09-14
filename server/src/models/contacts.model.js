const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    userId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: Number },
});

module.exports = mongoose.model("Contact", contactSchema);
