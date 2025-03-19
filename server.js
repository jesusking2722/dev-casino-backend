const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const translationRoutes = require("./routes/translationRoutes");
require("./config/db");
require("./config/passport")(passport);

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api", translationRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
