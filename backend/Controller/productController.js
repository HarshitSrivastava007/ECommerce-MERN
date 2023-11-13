import Product from '../tables/productTable.js'
import asyncHandler from 'express-async-handler'


//fetching all data, GET=> /api/products,   its a Public (anyone can access it) no login token required
const getProducts = asyncHandler( async(req,res) =>{
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword 
    ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i',
        },
    } : {}

    const count = await Product.count({...keyword})

    const products = await Product.find({ ...keyword}).limit(pageSize).skip(pageSize * (page -1)) 
    
    res.json({ products, page, pages: Math.ceil(count / pageSize) }) 
})


//fetching only one data, GET=> /api/products/:id,   its a Public (anyone can access it) no login token required
const getProductById = asyncHandler( async(req,res) =>{
    const product= await Product.findById(req.params.id)
    if (product){
        res.json(product)
    } else{
        res.status(404)     //its optional because default is 500
        throw new Error('Product Not Found')
    }
})


//Create a product, POST=> /api/products,   its a private/ admin
const createProduct = asyncHandler( async(req,res) =>{
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: 'images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description'
    })
    
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})



//Delete a product, DELETE=> /api/products/:id,   its a private/ admin
const deleteProduct = asyncHandler( async(req,res) =>{
    const product= await Product.findById(req.params.id)
    if (product){
        await product.remove()
        res.json({ message: 'Product Removed!!'})
    } else{
        res.status(404)     //its optional because default is 500
        throw new Error('Product Not Found')
    }
})






//Update a product, PUT=> /api/products/:id,   its a private/ admin
const updateProduct = asyncHandler( async(req,res) =>{
    const { name, 
            price, 
            description, 
            image, 
            brand,
            category, 
            countInStock} = req.body 

    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.price = price
        product.brand = brand
        product.image = image
        product.category = category
        product.description = description
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error("Product Not Found")
    }
}) 



//Create new Review, POST=> /api/products/:id/reviews,   its a private
const createProductReview = asyncHandler( async(req,res) =>{
    const { rating, comment} = req.body 

    const product = await Product.findById(req.params.id)                   //find the product from url 
    
    if(product){
      const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString())  

        if(alreadyReviewed){
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review ={
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)                    //pushing new review In Products Reviews Array
        
        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / 
        product.reviews.length
        


        await product.save()
        res.status(201).json({ message: 'Review added'})
    }else{
        res.status(404)
        throw new Error("Product Not Found")
    }
})



//get Top rated products, GET=> /api/products/top,   its a public 
const getTopProducts = asyncHandler( async(req,res) =>{
   const products = await Product.find({}).sort({rating: -1}).limit(3) 
   res.json(products)
})


export {getProducts, getProductById, deleteProduct, updateProduct, createProduct, createProductReview, getTopProducts}