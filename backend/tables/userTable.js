import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    isAdmin:{
        type: Boolean,
        required: true,
        default: false              //other users will be users to admin thats why default False
    },
    
},{
    timestamps: true
})

userSchema.methods.matchPassword = async function(enteredPassword) {                 //decrypting the password   //user sending simple String password but password in Database is encypted
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next){                       
    if(!this.isModified('password')){
        next()
    }
    
    const salt = await bcrypt.genSalt(10)                                            //here we setting up a new user's String password into bcrypt (encrypting the new users password into Hash)    
    this.password= await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
