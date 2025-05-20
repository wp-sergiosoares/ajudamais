const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json(user);
};

// get all users
const getAllUsers = async (req, res) => {
  // console.log('GET /users chamado')
  // console.log('Query:', req.query)
  // console.log('Headers:', req.headers)

  // res.status(200).send({
  //     tshirt: 'sss',
  //     size: 'large'
  // })

  const users = await User.find();
  res.status(200).json(users);
};

// delete a user by given id
const deleteUser = async (req, res) => {
  //id da req
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  //mongo delete by id
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, getAllUsers, deleteUser, getUser };
