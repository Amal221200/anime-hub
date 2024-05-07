import mongoose from "mongoose";

declare global {
    var connection: number | undefined
}
const connectDB = async () => {
    if (globalThis.connection) {
        return true;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Mongodb connected');
        globalThis.connection = mongoose.connections[0].readyState
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}

export default connectDB;