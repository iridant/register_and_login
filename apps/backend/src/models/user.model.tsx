/** @type {import("mongoose").Model} */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = mongoose.model("User", new Schema({
    username: String,
    hash: String,
    roles: [String]
}));

export {}

module.exports = User;