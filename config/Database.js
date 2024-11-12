import mongoose from "mongoose";

const ConnectDb = async() => {
    try {
        const Conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Database Connected .... ${Conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
    }
}

export default ConnectDb;