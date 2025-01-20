import mongoose from 'mongoose'; // If using ESM (ECMAScript modules)



const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb atlas connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

export default connectDb;
