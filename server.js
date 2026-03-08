const express = require('express')
const { Server } = require('socket.io')
const {createServer} =require('http')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

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
const dirPath = path.resolve()
if(process.env.NODE_ENV === 'production'){
    
    app.use(express.static(path.join(dirPath, "frontend/dist")))

app.use((req, res) => {
  res.sendFile(path.join(dirPath, "frontend", "dist", "index.html"))
})
}
// Updated for: frontend is INSIDE backend
/*const dirPath = path.resolve();

if (process.env.NODE_ENV === 'production') {
    // Look directly inside the current folder for 'frontend/dist'
    const frontendDistPath = path.join(dirPath, "frontend", "dist");
    
    app.use(express.static(frontendDistPath));

    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendDistPath, "index.html"));
    });
}*/

server.listen(PORT,()=>{
    console.log(`Server connected to port ${PORT}`)
})