import connectDB from "@/utils/db";
import { Document, Schema, model, models, } from "mongoose";

interface IUser extends Document {
    username: string,
    role: "user" | "admin",
    email: string,
    password: string,
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        min: [8, "Password too short"],
        max: [12, "Password too long"],
        required: [true, "Password is required"],
    }
}, {
    timestamps: true
})

const User = models?.User || model<IUser>('User', UserSchema);

export default User;