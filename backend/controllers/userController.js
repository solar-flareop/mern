const User = require("../models/user");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWTSECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
};

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ errorMsg: error.message });
  }
};

// const getall = async (req, res) => {
//   const all = await User.find({});
//   res.status(200).json(all);
// };

module.exports = {
  loginUser,
  signupUser,
  // getall,
};
