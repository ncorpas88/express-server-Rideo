const express = require("express");
const router = require("express").Router();

const postRouter = require("./post.routes")
router.use("/post", postRouter)

const commentRouter = require("./comment.routes")
router.use("/comment", commentRouter)

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const userRouter = require("./user.routes")
router.use("/user", userRouter)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);


// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
