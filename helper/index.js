const crypto = require("crypto");

let otpStore = {}; // In-memory object to store OTPs

const storeOTP = (phone, otp) => {
  otpStore[phone] = otp;
  setTimeout(() => {
    delete otpStore[phone]; // OTP expires after 5 minutes
  }, 5 * 60 * 1000); // 5 minutes expiry
};

const verifyOTP = (phone, userOTP) => {
  return otpStore[phone] === userOTP;
};

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Ensure Redis disconnects on shutdown to prevent errors
process.on("exit", () => client.quit());

module.exports = { generateOTP, storeOTP, verifyOTP };
