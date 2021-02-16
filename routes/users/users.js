const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  signup,
  login,
  deleteUserByEmail,
  deleteUserByID,
  updateUserByID,
  updateUserByEmail,
} = require("./controller/userController");
const { checkSignupInputIsEmpty } = require("./lib/checkSignup");
const { checkSignupDataType } = require("./lib/checkSignupDataType");
const {
  checkLoginEmptyMiddleware,
  checkEmailFormat,
} = require("./lib/checkLogin");
/* GET users listing. */
router.get("/", async function (req, res, next) {
  res.send("something");
});
router.get("/get-all-users", getAllUsers); // it will retrieve all the users stored in the database.
router.post(
  "/create-user",
  checkSignupInputEmpty,
  checkSignupDataType,
  signup
);
router.post("/login", checkLoginEmptyMiddleware, checkEmailFormat, login); // this post is for login. it will check the email format using middleware 
router.delete("/delete-user-by-id/:id", deleteUserByID); // it deletes the user by  id.
router.delete("/delete-user-by-email", deleteUserByEmail); // deletes user by email.
router.put("/update-user-by-id/:id", updateUserByID); // updates the user by id.
router.put("/update-user-by-email/", updateUserByEmail); // it updates user by email.
module.exports = router;