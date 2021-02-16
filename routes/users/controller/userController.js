const bcrypt = requireL("bcryptjs");
const User = require("../model/User");
module.exports = {
  getAllUsersCallback: (req, res) => {
    User.find({}, function (err, foundAllUsers) {
      if (err) {
        res.status(500).json({ message: "Failed", errorMessage: err.message });
      } else {
        res.status(200).json({
          message: "success",
          users: foundAllUsers,
        });
      };
    });  
  },
  getAllUsers: async (req, res) => {
    try {
      const foundAllUsers = await User.find({});
      res.status(200).json({
        message: "success",
        users: foundAllUsers,
      });
    } catch (error) {
      res.status(500).json({
        message: "failure",
        errorMessage: error.message,
      });
    };
  },
  signup: async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
      const salted = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salted);
      const createdUser = new User({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: hashedPassword,
      });
      let savedUser = await createdUser.save();
      res.status(200).json({
        message: "success",
        user: savedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    };
  },
  deleteUserByID: async (req, res) => {
    try {
      let deletedUser = await User.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json({
        message: "successfully deleted",
        deletedUser: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    };
  },
  deleteUserByEmail: async (req, res) => {
    try {
      let deletedUser = await User.findOneAndDelete({ email: req.body.email });
      res.status(200).json({
        message: "successfully deleted",
        deletedUser: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    };
  },
  updateUserByID: async (req, res) => {
    try {
      let updatedUser = await User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "successfully updated",
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    };
  },
  updateUserByEmail: async (req, res) => {
    try {
      let updatedUser = await User.findOneAndUpdate(
        { email: req.body.email },
        req.body,
        { new: true }
      );
      res.status(200).json({
        message: "successfully updated",
        updatedUser: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    };
  },
  login: async (req, res) => {
    try {
      let foundUser = await User.findOne({ email: req.body.email });
      if (!foundUser) {
        res.status(404).json({
          message: "failure",
        });
      } else {
        let isPasswordTrue = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );
        if (isPasswordTrue) {
          res.json({
            message: "success",
            successMessage: "Logged In!",
          });
        } else {
          res.status(500).json({
            message: "failure",
            successMessage: "please check your email and password",
          });
        };
      };
    } catch (error) {
      res.status(500).json({
        message: "error",
        errorMessage: error.message,
      });
    };
  },
};
