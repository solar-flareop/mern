const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: "String",
    requiree: true,
    unique: true,
  },
  password: {
    type: "String",
    require: true,
  },
});

//static signup method
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields are required!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is invalid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong!");
  }

  const emailExist = await this.findOne({ email });
  if (emailExist) {
    throw Error("Email already in use");
  }

  //hasing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields are required!");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User does not exist");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw Error("Invalid Credentials");
  }
  return user;
};

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
