const router = require("express").Router();

const Post = require("../models/Post.model")


//Crear un nuevo Post
router.post("/post", async(req, resizeBy, next) => {
    try {
        const response = await Post.create({
            image: req.body.image,
            title: req.body.title,
            description: req.body.description,
            distanceKm: req.body.distanceKm,
            location: req.body.location
        })
        res.json(response)
    } catch (error) {
        next(error)
    }
})


module.exports = router