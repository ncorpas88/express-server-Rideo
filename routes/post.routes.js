const router = require("express").Router();

const { verifyToken } = require("../middlewares/auth.middlewares");
const Post = require("../models/Post.model")


//Crear un nuevo Post
router.post("/", verifyToken, async(req, res, next) => {
    console.log(req.body)
    try {
        const response = await Post.create({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            distancekm: req.body.distancekm,
            location: req.body.location,
            userCreator: req.payload.userCreator
        })
        res.json(response)
    } catch (error) {
        next(error)
    }
})


module.exports = router