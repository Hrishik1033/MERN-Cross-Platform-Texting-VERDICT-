const express = require('express')
const { Server } = require('socket.io')
const {createServer} =require('http')
const cors = require('cors')
const path = require('path')
const connectDb = require('./db/db.js')
require('dotenv').config()
connectDb()
const userModel = require('./model/userModel.js')

const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())
//Setting up the Server
const server = createServer(app)
const io = new Server(server,{
    cors:{
        //origin:"http://localhost:5173",
        origin:"*",
        credentials:true,
        methods:['POST','GET','DELETE']
    }
})



//Setting up sockets
io.on('connection',(socket)=>{
    console.log('Welcome ',socket.id)
    socket.on('send-message',(message)=>{
        message = message+' '+socket.id
        io.emit('receive-message',message)
    })
})
//Deployment code
/*const dirPath = path.resolve()
if(process.env.NODE_ENV === 'production'){
    
    app.use(express.static(path.join(dirPath, "frontend/dist")))

app.use((req, res) => {
  res.sendFile(path.join(dirPath, "frontend", "dist", "index.html"))
})
}*/

//Adding routes and auth
//Login
app.post('/login', async (req, res) => {
  try {
    const { email, pass } = req.body
    if (!email || !pass) {
      return res.status(400).json({ message: 'Please fill in all the fields' })
    }
    const existing_user = await userModel.findOne({ email })
    if (!existing_user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }
    if (existing_user.password !== pass) {
      return res.status(401).json({ message: 'Incorrect password' })
    }
    return res.json({ message: 'Login successful' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
//Signup
app.post('/signup', async (req, res) => {
  try {
    const { name, email, pass } = req.body
    if (!name || !email || !pass) {
      return res.status(400).json({ message: 'Please fill in all the fields' })
    }
    const existing_user = await userModel.findOne({ email })
    if (existing_user) {
      return res
        .status(409)
        .json({ message: 'User already exists, please Login to proceed' })
    }
    const newUser = new userModel({ name, email, password: pass })
    await newUser.save()
    return res.status(201).json({ message: 'Signup successful' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
//see users
app.get('/see', async (req, res) => {
  try {
    const result = await userModel.find()
    res.json({ message: 'List of all registered users', result })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
// Updated for: frontend is INSIDE backend
const dirPath = path.resolve();

    // This is the most reliable way to find the folder regardless of Root Dir settings
    const frontendDistPath = path.join(__dirname, 'frontend', 'dist');
    
    // Log this to your Render console so you can see EXACTLY where it's looking
    console.log("Serving static files from:", frontendDistPath);

    app.use(express.static(frontendDistPath));

    app.get((req, res) => {
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });


server.listen(PORT,()=>{
    console.log(`Server connected to port ${PORT}`)
})