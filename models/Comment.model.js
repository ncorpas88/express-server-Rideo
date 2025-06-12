
const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        userCreator: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        postCommented: {
             type: Schema.Types.ObjectId,
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
    },
    {    
    timestamps: true
  }
)

const Comment = model("Comment", commentSchema)

module.exports = Comment