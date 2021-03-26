import jwt from 'jsonwebtoken'

const generateToken = (id) => {                      //this function take an ID (user ID), because we want to add as the Payload in this token.  
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d'
    })
}

export default generateToken