import asyncHandler from 'express-async-handler'
import  generateToken from '../TokenUtils/genarateToken.js' 
import User from '../tables/userTable.js'


//Authenticating user & get Token, POST=> /api/users/login,   its a Public (anyone can access it) 
const authUser = asyncHandler(async (req,res) =>{
    const {email,password} = req.body

    const user = await User.findOne({ email })

    if(user && (await user.matchPassword(password)))            //matchPassword will go to and Match with encrypted Password
    {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else{                                                       //if user not found and Password doesn't match 
        res.status(401)                    //user unauthorized
        throw new Error('Invalid email or password')
    }
})


//Register a new, POST=> /api/users,   its a Public 
const registerUser = asyncHandler(async (req,res) =>{
    const {name, email,password} = req.body

    const userExists = await User.findOne({ email })

    if(userExists)
    {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        name,
        email,
        password                               //this will be encrypted form Mongoose middleware code in userTable
    })

    if(user)
    {
        res.status(201).json({                  //somthing is Created
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })                   
    }
    else{
        res.status(400)
        throw new Error("Invalid User Data")

    }

})



//Get user profile , GET=> /api/users/profile,   its a Private
const getUserProfile = asyncHandler(async (req,res) =>{
    
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})


//update user profile , PUT=> /api/users/profile,   its a Private
const updateUserProfile = asyncHandler(async (req,res) =>{
    
    const user = await User.findById(req.user._id)

    if(user){
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
       if(req.body.password)
       {
           user.password = req.body.password
       }

       const updatedUser = await user.save()

       res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})




//get all user profile , GET=> /api/users,   its a Private/Admin
const getUsers = asyncHandler(async (req,res) =>{
    const users = await User.find()
    res.json(users)
})



//going to delete user , DELETE=> /api/users/:id,   its a Private/Admin
const deleteUser = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id)
    
    if(user){
        await user.remove()
        res.json({ message: 'User is removed!!'})
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})


//get user by id , GET=> /api/users/:id,   its a Private/Admin
const getUserById = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error("User Not Found")
    }
})


//update user  , PUT=> /api/users/:id,   its a Private/admin
const updateUser = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.params.id)

    if(user){
       user.name = req.body.name || user.name
       user.email = req.body.email || user.email
       user.isAdmin= req.body.isAdmin || user.isAdmin

       const updatedUser = await user.save()

       res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
})



export {authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser}