const mongoose = require("mongoose"); // this is the cookie cutter. This is the schema that will display in the database.
const userSchema = new mongoose.Schema({
  fistName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
module.exports = mongoose.model("user", userSchema);