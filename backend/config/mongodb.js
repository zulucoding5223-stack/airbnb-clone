import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const mongouri = process.env.MONGO_URI;

        if(mongouri){
            await mongoose.connect(mongouri);
            console.log('Database connected successfully')
        } else{
            console.log('Connecction string not found')
        }
    } catch (error) {
        console.error("Could not connect to database: ", error.message)
        throw error
    }
}

export default connectDB;