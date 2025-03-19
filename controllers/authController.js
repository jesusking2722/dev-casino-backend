const queryAsync = require("../config/queryAsync");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../services/emailService");
const { generateOTP, storeOTP, verifyOTP } = require("../helper");
const { sendSMS } = require("../services/smsService");
const { verifyGoogleCode } = require("../services/googleService");

const emailRegister = async (req, res) => {
  try {
    const { email, password } = req.body;
    let sql = "SELECT id FROM w_users WHERE email = ? ;";
    const existingUser = await queryAsync(sql, [email]);
    if (existingUser.length > 0) {
      return res.json({ ok: false, message: "Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    sql = "INSERT INTO w_users (email, password) VALUES (?, ?) ;";
    await queryAsync(sql, [email, hashedPassword]);
    sql = "SELECT id FROM w_users WHERE email = ? ;";
    const user = await queryAsync(sql, [email]);
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({
      ok: true,
      data: {
        token: `Bearer ${token}`,
        user: { email, password: hashedPassword },
      },
    });
  } catch (error) {
    console.log("email register error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const emailLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let sql = "SELECT * FROM w_users WHERE email = ? ;";
    const user = await queryAsync(sql, [email]);
    if (
      user.length === 0 ||
      (await bcrypt.compare(password, user[0].password))
    ) {
      return res.json({ ok: false, message: "Invalid credential" });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.json({ ok: true, data: { token: `Bearer ${token}`, user } });
  } catch (error) {
    console.log("email login error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const sendEmailVerifyLink = async (req, res) => {
  try {
    const { email } = req.body;
    const sql = "SELECT * FROM w_users WHERE email = ? ;";
    const user = await queryAsync(sql, [email]);
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const verificationLink = `http://127.0.0.1:5001/api/auth/email/verify?token=${token}`;
    await sendVerificationEmail(email, verificationLink);
    res.json({ ok: true, message: "Please check your inbox" });
  } catch (error) {
    console.log("send email verify link error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).send("Verification token is missing.");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(404).send("User not found");
    }
    const sql = "UPDATE w_users SET email_verified = 'yes' WHERE id = ?;";
    await queryAsync(sql, [decoded.id]);
    res.redirect(process.env.FRONT_BASE_URL);
  } catch (error) {
    console.log("verify email error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const phoneRegister = async (req, res) => {
  try {
    const { phone, password } = req.body;
    let sql = "SELECT id FROM w_users WHERE phone = ? ;";
    const existingUser = await queryAsync(sql, [phone]);

    if (existingUser.length > 0) {
      return res.json({ ok: false, message: "Already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    sql = "INSERT INTO w_users (phone, password) VALUES (?, ?) ;";
    await queryAsync(sql, [phone, hashedPassword]);
    sql = "SELECT id FROM w_users WHERE phone = ? ;";
    const user = await queryAsync(sql, [phone]);
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({
      ok: true,
      data: {
        token: `Bearer ${token}`,
        user: { phone, password: hashedPassword },
      },
    });
  } catch (error) {
    console.log("phone register error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const phoneLogin = async (req, res) => {
  try {
    const { phone, password } = req.body;
    let sql = "SELECT * FROM w_users WHERE phone = ? ;";
    const user = await queryAsync(sql, [phone]);
    if (
      user.length === 0 ||
      (await bcrypt.compare(password, user[0].password))
    ) {
      return res.json({ ok: false, message: "Invalid credential" });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.json({ ok: true, data: { token: `Bearer ${token}`, user } });
  } catch (error) {
    console.log("phone login error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const sendPhoneVerificationCode = async (req, res) => {
  try {
    const { phone } = req.body;
    const otp = generateOTP();
    await sendSMS(phone, otp);
    storeOTP(phone, otp);
    console.log("stored otp: ", otp);
    res.json({ ok: true, message: "Please check your SMS" });
  } catch (error) {
    console.log("send phone verification code error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const verifyPhone = async (req, res) => {
  try {
    const { phone, otp, id } = req.body;
    console.log("Sent otp: ", otp);
    const verified = await verifyOTP(phone, otp);
    if (!verified) {
      return res.json({
        ok: false,
        message: "Invalid verification code.\nplease resend",
      });
    }
    const sql = "UPDATE w_users SET phone_verified = 'yes' WHERE id = ?;";
    await queryAsync(sql, [id]);
    res.json({ ok: true, message: "Verified successfully" });
  } catch (error) {
    console.log("send phone verification code error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const googleRegister = async (req, res) => {
  try {
    const { code } = req.body;
    const payload = await verifyGoogleCode(code);
    if (!payload) {
      return res.json({
        ok: false,
        message: "User not found in Google authentication",
      });
    }
    const { email, email_verified, sub, family_name, given_name } = payload;
    const hashedPassword = await bcrypt.hash(sub, 10);
    const e_verified = email_verified ? "yes" : "no";
    let sql =
      "INSERT INTO w_users (email, password, first_name, last_name, email_verified) VALUES (?, ?, ?, ?, ?) ;";
    await queryAsync(sql, [
      email,
      hashedPassword,
      family_name,
      given_name,
      e_verified,
    ]);
    sql = "SELECT * FROM w_users WHERE email = ? ;";
    const user = await queryAsync(sql, [email]);
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({ ok: true, data: { token: `Bearer ${token}`, user: user[0] } });
  } catch (error) {
    console.log("google register error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { code } = req.body;
    const payload = await verifyGoogleCode(code);
    const sql = "SELECT * FROM w_users WHERE email = ? ;";
    const user = await queryAsync(sql, [payload.email]);
    if (user.length === 0 || !user) {
      return res.json({
        ok: false,
        message: "User not found, please register",
      });
    }
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    console.log(token);
    res.json({ ok: true, data: { token: `Bearer ${token}`, user: user[0] } });
  } catch (error) {
    console.log("google login error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

const fetchMe = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "SELECT * FROM w_users WHERE id = ? ;";
    const user = await queryAsync(sql, [id]);
    if (!user || user.length === 0) {
      return res.json({ ok: false, message: "User not found" });
    }
    res.json({ ok: true, data: user[0] });
  } catch (error) {
    console.log("fetch me error: ", error);
    res.json({ ok: false, message: "Server error" });
  }
};

module.exports = {
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
};
