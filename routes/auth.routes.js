const router = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model")
const {verifyToken} = require("../middlewares/auth.middlewares")

// POST "/api/auth/signup" => Ruta para registrar un usuario
router.post("/signup", async(req, res, next) => {

    const {username, email, password, image} = req.body

    // que todos los campos existan y tengan valores
      if (!username || !email || !password || !image) {
        res.status(400).json({ errorMessage: "Todos los campos son obligatorios (name, email, password)" })
        return; 
    }
    // se valida la contraseña
    let regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
    if (regexPassword.test(password) === false) {
        res.status(400).json({ errorMessage: "La contraseña no es valida. Debe contener al menos una letra, un numero, un caracter especial y tener entre 8 y 16 caracteres." })
    return;
    }

    try {
        //Mail sea unico
        const foundUser = await User.findOne({email:email})

        if (foundUser !== null) {
            res.status(400).json({ errorMessage: "Ya existe un usuario con ese correo electronico" })
            return;
        }

        // se cifra la contraseña
        const hashPassword = await bcrypt.hash(password, 12)

        await User.create({
            username,
            email,
            password:hashPassword,
            image
        })

        res.sendStatus(201)

    } catch (error) {
        next(error)
    }
})


// POST "/api/auth/login" => Validar las credenciales del usuario (autenticarlo) y entregarle el Token
router.post("/login", async(req, res, next) => {

    const {email, password} = req.body

    if(!email || !password) {
        res.status(400).json({errorMessage: "Todos los campos son obligatorios (email, password)"})
        return;
    }

    try {
        const foundUser = await User.findOne({email:email})
        if (foundUser === null) {
            res.status(400).json({ errorMessage: "Usuario no registrado" })
            return;
        }

        const isPasswordCorrect = await bcrypt.compare( password, foundUser.password )
        if (isPasswordCorrect === false) {
            res.status(400).json({ errorMessage: "La contraseña no es válida" })
            return;
        }

        const payload = {
            _id:foundUser._id,
            email:foundUser.email
        }

        const authToken = jwt.sign(payload, process.env.SECRET_TOKEN,{
            algorithm:"HS256",
            expiresIn:"365d"
        })

        res.status(200).json({authToken})

    } catch (error) {
        next(error)
    }
})

// GET "/api/auth/verify" => Validar el token (luego de generarlo y cuando el usuario vuelva a la app 
router.get("/verify", verifyToken, (req, res,) => {
    res.json({payload: req.payload})
})




module.exports = router