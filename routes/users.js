const express = require("express");

const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUserData,
  createNewUser,
} = require("../controllers/user-controller");

const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../models/index");

const router = express.Router();

/**
 * Route: /
 * Method: GET
 * Description: Get all users
 * Access: Public
 * Parameters: None
 */

//localhost:8081/users

router.get("/", getAllUsers);

/**
 * Route: /:id
 * Method: GET
 * Description: Get single user by their id
 * Access: Public
 * Parameters: Id
 */

router.get("/:id", getSingleUserById);

/**
 * Route: /
 * Method: POST
 * Description: Creating a new user
 * Access: Public
 * Parameters: None
 */

router.post("/", createNewUser);

/**
 * Route: /:id
 * Method: PUT
 * Description: Updating a user by their id
 * Access: Public
 * Parameters: ID
 */

router.put("/:id", updateUserData);

/**
 * Route: /:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameters: ID
 */

router.delete("/:id", deleteUser);

/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Description: Get all user Subscription Details
 * Access: Public
 * Parameters: ID
 */

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User With The ID Didnt Exist",
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };

  // Jan 1 1970 UTC
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  // console.log("returnDate ", returnDate);
  //   console.log("currentDate ", currentDate);
  //     console.log("subscriptionDate ", subscriptionDate);
  //       console.log("subscriptionExpiration ", subscriptionExpiration);

  const data = {
    ...user,
    isSubscriptionExpired: subscriptionExpiration < currentDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currentDate
        ? 0
        : subscriptionExpiration - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpiration <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).json({
    success: true,
    message: "Subscription detail for the user is: ",
    data,
  });
});

module.exports = router;
