import bcrypt from 'bcryptjs';


const users = [
    {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('admin',3),
    isAdmin: true
},

{
    name: 'Harshit Srivastava',
    email: 'harshit@gmail.com',
    password: bcrypt.hashSync('harshit',3),
},

{
    name: 'Kaustubh Hundet',
    email: 'kaustubh@gmail.com',
    password: bcrypt.hashSync('kaustubh',3),
}
]

export default users;