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

//Devuelve todos los post
router.get("/", async(req, res, next) => {
    try {
        const response = await Post.find()
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

//Devuelve un post con los detalles
router.get("/:postId", async(req, res, next) => {
    try {
        const postDetails = await Post
        .findById(req.params.postId)
        .populate("userCreator")
        res.status(200).json(postDetails)
    } catch (error) {
        next(error)
    }
})


module.exports = router