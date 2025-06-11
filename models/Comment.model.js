
const { Schema, model } = require("mongoose");

const comments = new Schema(
    {
        userCreator: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        postCommented: {
             type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        imagen: {
            type: String
        }
    }
)