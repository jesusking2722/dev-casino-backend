const express = require("express");
const router = express.Router();
const {
  emailRegister,
  emailLogin,
  sendEmailVerifyLink,
  verifyEmail,
  phoneRegister,
  phoneLogin,
  sendPhoneVerificationCode,
  verifyPhone,
  googleRegister,
  googleLogin,
  fetchMe,
} = require("../controllers/authController");

router.post("/email/register", emailRegister);
router.post("/email/login", emailLogin);
router.post("/email/send/verify", sendEmailVerifyLink);
router.get("/email/verify", verifyEmail);
router.post("/phone/register", phoneRegister);
router.post("/phone/login", phoneLogin);
router.post("/phone/send/verify", sendPhoneVerificationCode);
router.post("/phone/verify", verifyPhone);
router.post("/google/register", googleRegister);
router.post("/google/login", googleLogin);
router.get("/me/:id", fetchMe);

module.exports = router;
