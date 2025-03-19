const axios = require("axios");
require("dotenv").config();

const sendSMS = async (phone, otp) => {
  const url = "https://api.sendberry.com/SMS/SEND";

  const params = {
    key: process.env.SMS_API_KEY,
    name: process.env.SMS_USER_NAME,
    password: process.env.SMS_USER_PASSWORD,
    content: `Welcome to JADEJACK !!!   This is your verification code: ${otp}`,
    to: [phone.toString()],
    from: "JADEJACK",
    chatcallback: "SMS ANSWERS WEBHOOK",
  };

  try {
    const response = await axios.post(url, params, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response:", response.data);
  } catch (error) {
    console.error(
      "Error sending SMS:",
      error.response ? error.response.data : error.message
    );
  }
};

module.exports = { sendSMS };
