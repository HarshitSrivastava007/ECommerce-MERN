import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../tables/userTable.js'

const protect = asyncHandler( async (req, res, next) =>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))     //now i want to check for the token
    {
        try {
            
            token = req.headers.authorization.split(' ')[1]                             //here we decoding the token and we use (split)method for decoding token after Space and Index(1)    (' ')[1] 
           
            const decoded= jwt.verify(token, process.env.JWT_SECRET)                    //here we decoding the and we verifing the token with our SECRET
            
            req.user = await User.findById(decoded.id)

            next()
        } catch (error) {
            console.error(error)
            res.status(401)                                                              //if token is failed
            throw new Error('Not authorized, Token is failed')
        }
    }
    
    if(!token)
    {
        res.status(401)         //unAuthorized
        throw new Error('Not authorized, no token')
    }
})

const admin = (req,res, next) =>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res. status(401)
        throw new Error('Not authorized as an Admin')
    }
}

export { protect, admin }