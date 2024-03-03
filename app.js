// ./app.js

// Import express
const express = require("express");
// Import pino and create logger instance
const logger = require('pino')()
// Import nodemailer
const nodemailer = require("nodemailer");

// Create nodemailer transport
const transporter = nodemailer.createTransport({
    // Use your own SMPT host
    host: "",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    // Use your auth credentials for the SMTP server
    auth: {
        user: "",
        pass: "",
    },
    // Pass pino logger instance to transport logger option
    logger,
    // Set debug option to true
    debug: true,

});

const app = express();

app.use(express.json());

// Route to check server is working
app.get("/", (req, res) => {
    logger.info("logger working")
    res.status(200).send('Working');
})

// Route used to send email and test logger
app.get("/send-email", async (req, res) => {
    // Use created transport to send email
    logger.info("logger working")
    transporter.sendMail({
        from: '', // sender address
        to: "", // list of receivers
        subject: "Test email", // Subject line
        text: "Test message", // plain text body
    });
    res.status(200).send('Email sent');
})

module.exports = app;
