import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/user.js'
import products from './data/products.js'
import User from './tables/userTable.js'
import Product from './tables/productTable.js'
import Order from './tables/orderTable.js'
import connectDatabase from './DBconfig/db.js'

dotenv.config()

connectDatabase()

const importData = async()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser = await User.insertMany(users)
        const adminUser = createdUser[0]._id
        const sampleProducts =products.map(product =>{
            return { ...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)            //now we insert data in product table with Admin User we created
        console.log("Data SuccessFully Imported!!".green.inverse);
        process.exit()
    }catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

const destroyData = async()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        console.log("Data SuccessFully Destroyed!!".red.inverse);
        process.exit()
    }catch(error){
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d'){
    destroyData()
}
else{
    importData()
}
