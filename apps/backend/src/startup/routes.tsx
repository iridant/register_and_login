import * as path from 'path';

const cors = require("cors")
const express = require("express");
const authRouter = require("../routes/auth");

module.exports = function(app) {
    app.use(cors())
    app.use(express.json());
    app.use('/assets', express.static(path.join(__dirname, 'assets')));
    app.use('/auth', authRouter);
};