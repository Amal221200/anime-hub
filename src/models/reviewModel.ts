import { Schema, model, models } from "mongoose";
import Anime from "./animeModel.js";

const ReviewSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    anime: {
        type: Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    }
}, {
    timestamps: true
})

const Review = models?.Review || model('Review', ReviewSchema);

export default Review;

