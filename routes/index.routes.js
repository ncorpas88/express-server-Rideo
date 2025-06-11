const express = require("express");
const router = require("express").Router();

const postRouter = require("./post.routes")
router.use("/post", postRouter)

const userRouter = require("./auth.routes")
router.use("/auth", userRouter)

// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
