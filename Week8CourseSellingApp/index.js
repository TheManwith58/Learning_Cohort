const express = require( "express");
const app = express();
const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/user");
app.use("/user", userRouter);
app.user("/course" , courseRouter);
app.listen(3000);