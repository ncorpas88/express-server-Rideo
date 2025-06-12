const router = require("express").Router();

const { verifyToken } = require("../middlewares/auth.middlewares");
const User = require("../models/User.model")


//Ver el perfir de otro usuario
router.get("/:userId", async(req, res, next) => {
    try {
        const response = await User.findById(req.params.userId)
        .select("username email image")
        res.json(response)
    } catch (error) {
        next(error)
    }
})

//Actualizar tu perfil
router.put("/:userId", verifyToken, async(req,res, next) => {
    try {
        const responseFromDB = await User.findByIdAndUpdate(req.params.userId,
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