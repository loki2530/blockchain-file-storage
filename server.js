const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use(express.static("public"));

app.use("/auth", require("./routes/authRoutes"));
app.use("/api/files", require("./routes/fileRoutes"));

app.get("/", (req, res) => {
  res.redirect("/login.html");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
