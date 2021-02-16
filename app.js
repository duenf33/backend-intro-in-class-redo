const creatError = require("htto-errors"); // create new errors with giving messages.
const express = require("express"); // requires the Express module.
const path = require("path"); // The path module provides utilities for working with file and directory paths. 
const cookieParser = require("cookie-parser"); // its a middleware which Parse cookie header and populate req.cookies with an object keyed by the cookie names.
const logger = require("morgan"); // Create a new morgan logger middleware function using the given format and options. The format argument may be a string of a predefined name (see below for the names), a string of a format string, or a function that will produce a log entry.
// First be sure you have MongoDB and Node.js installed. Next install Mongoose from the command 
const mongoose = require("mongoose"); // it connects with the database running on localhost.
mongoose
	.connect("mongodb://localhost:27017/backend-intro", {
		useNewUrlParse: true,
		useUnifiedTopology: true,
	})
	.then(() => { // this is a promise.
		console.log("MONGO DB CONNECTER");
	})
	.catch((e) => {
		console.log(e);
	});
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users/users");
const app = express();
// view engine setup
app.set("views", path.join(_dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(_dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};
	res.status(err.status || 500); // render the error page
	res.render("error");
});
module.exports = app;
