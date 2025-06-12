const router = require("express").Router();

const { verifyToken } = require("../middlewares/auth.middlewares");
const Comment = require("../models/Comment.model")



//Crear un comentario en un post
router.post("/:postId", verifyToken, async(req, res, next) => {
    try {
        const response = await Comment.create({
            text: req.body.text,
            image: req.body.image,
            userCreator: req.payload._id,
            postCommented: req.params.postId
    })
    res.json(response)
    } catch (error) {
        next(error)
    }
    
})

//Devolver los comentarios de un post
router.get("/postCommented/:postId", async(req, res, next) => {
    try {
        const response = await Comment.find({postCommented: req.params.postId})
        .populate("postCommented")
        res.json(response)
    } catch (error) {
        next(error)
    }
})

//Borrar un comentario
router.delete("/:commentId", verifyToken, async(req, res, next) => {
    try {
        const response = await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).send({Message: "comentario eliminado"})
    } catch (error) {
        res.status(500).send(({errorMessage: "error al eliminar"}))
    }
})




module.exports = router