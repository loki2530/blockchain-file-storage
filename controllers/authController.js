const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ username, password: hashed });

  res.redirect("/login.html");
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.send("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send("Invalid credentials");

  req.session.userId = user._id;
  res.redirect("/home.html");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login.html");
  });
};
