import mongoose from "mongoose";

const mongodbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB: ', err);
    }
}

export default mongodbConnection;
