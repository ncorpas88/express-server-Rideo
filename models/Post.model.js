

const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        image: {
            type: [String],
            required: true
        },
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        userCreator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        distanceKm: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    }
)

const Post = model("Post", postSchema);

module.exports = Post;