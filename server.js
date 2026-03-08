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
/*const dirPath = path.resolve()
if(process.env.NODE_ENV === 'production'){
    
    app.use(express.static(path.join(dirPath, "frontend/dist")))

app.use((req, res) => {
  res.sendFile(path.join(dirPath, "frontend", "dist", "index.html"))
})
}*/
// Updated for: frontend is INSIDE backend
const dirPath = path.resolve();
if (process.env.NODE_ENV === 'production') {
    // 1. Define the path
    const frontendDistPath = path.resolve(__dirname, 'frontend', 'dist');
    
    console.log("Checking path:", frontendDistPath);

    // 2. Serve static files
    app.use(express.static(frontendDistPath));

    // 3. Catch-all route
    app.get('*', (req, res) => {
        const indexPath = path.join(frontendDistPath, 'index.html');
        res.sendFile(indexPath, (err) => {
            if (err) {
                console.error("Error sending index.html:", err);
                res.status(500).send("Frontend build not found. Ensure 'npm run build' worked.");
            }
        });
    });
}

server.listen(PORT,()=>{
    console.log(`Server connected to port ${PORT}`)
})