const router = require("express").Router();

const { verifyToken } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model")


//Ver mi perfil
router.get("/", verifyToken, async(req, res, next) => {
    try {
        const response = await User.findById(req.payload._id)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

//Ver el perfir de otro usuario
router.get("/:userId", async(req, res, next) => {
    try {
        const response = await User.findById(req.params.userId)
        .populate({
            path: "posts"
        })
        .select("username email image posts")
        res.json(response)
    } catch (error) {
        next(error)
    }
})

//Actualizar tu perfil
router.put("/", verifyToken, async(req,res, next) => {
    console.log(req.body)
    try {
        const responseFromDB = await User.findByIdAndUpdate(req.payload._id,
            {
              username: req.body.username ,
              email: req.body.email,
              image: req.body.image 
            },
        {new:true})
        
        res.json(responseFromDB)
    } catch (error) {
        next(error)
    }
})



module.exports = router