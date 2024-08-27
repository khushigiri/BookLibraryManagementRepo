const { UserModel, BookModel } = require("../models");

exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find();

  if (users.length == 0) {
    return res.status(404).json({
      success: false,
      message: "No Users Found in the Database",
    });
  }
  res.status(200).json({
    success: true,
    message: "These are the user info:",
    data: users,
  });
};

exports.getSingleUserById = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById({ _id: id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
};

exports.updateUserData = async (req, res) => {
  const { id } = req.params;

  const { data } = req.body;

  const updatedUSerData = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...data,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updatedUSerData,
  });
};

exports.createNewUser = async (req, res) => {};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.deleteOne({ _id: id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Deleted User...",
    data: users,
  });
};
