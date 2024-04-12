const mongoose = require("mongoose");

//email password validator
const valid = require("validator");

//hashing passwords
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//static signup method using mongoose, not a arrow function since 'this' is being used
userSchema.statics.signup = async function (email, password) {
  // email password validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  if (!valid.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!valid.isStrongPassword(password)) {
    throw Error(
      "Password not strong enough(minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1)"
    );
  }

  //checks if email already exists
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  //Hashing password using bcrypt and salt
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

//Static login method with hashing using bcrypt

userSchema.statics.login = async function (email, password) {
  // email password validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //checks if user already exists
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email does not exist");
  }

  //compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
