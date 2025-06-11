const router = require("express").Router();

const postRouter = require("./post.routes")
router.use("./posts", postRouter)

// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
