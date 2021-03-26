import express from 'express'
import path from 'path'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './DBconfig/db.js'
import {notFound,errorHandler} from './MiddlewareExceptionHandler/errorHandler.js'
import productRouter from './Router/productRouter.js'
import userRouter from './Router/userRoutes.js'
import orderRouter from './Router/orderRouter.js'
import uploadRouter from './Router/uploadRoutes.js'


dotenv.config();
connectDB();


const app=express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json());    //bodyparser sending data from client to server body


app.get('/',(req,res) =>{
    res.send("Get method is running...")
})

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)


app.get('/api/config/paypal',(req,res)=> res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/Uploads', express.static(path.join(__dirname, '/Uploads')))                                       //we want that no boddy will access to upload folder so we make it as static

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 9000
app.listen(PORT, function(){
    console.log(`Server is running in ${process.env.NODE_ENV} node on port ${PORT}` .yellow.bold)   
});