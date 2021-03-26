import mongoose from 'mongoose'

const connectDatabase = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        })
        console.log(`Mongo Database is Connected: ${conn.connection.host}`.cyan.underline);
    }catch(error){
        console.error(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)             // (1) exit with failer
    }
}
export default connectDatabase;