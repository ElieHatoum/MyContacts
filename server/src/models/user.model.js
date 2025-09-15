const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    createdAt: {
        type: Date,
    },
});

module.exports = mongoose.model("User", userSchema);
