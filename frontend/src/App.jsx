/*import React, { useEffect, useMemo, useState } from 'react'
import {io} from 'socket.io-client'
const App = () => {
  /*function setMessageState(event){
    setMessage(event.target.value)
  }
  const [message,setMessage] = useState('')
  const socket = useMemo(()=>io('http://localhost:3000'),[])

  const handleSubmit = (e)=>{
      e.preventDefault()
      socket.emit("send-message",message)
  }
  useEffect(()=>{
    socket.on("receive-message",(data)=>{
      console.log(data)
    })
  },[])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={message} onChange={(event)=>{setMessage(event.target.value)}}></input>
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}

export default App*/ 
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const socket = io("http://localhost:3000")

const App = () => {

  const [msg, setMsg] = useState("")
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit("send-message", msg)
  }

  useEffect(()=>{

    socket.on("receive-message",(data)=>{
      setMessages((prev)=>[...prev,data])
    })

  },[])

  return (
    <div style={{textAlign:"center", marginTop:"50px"}}>

      <h1>Socket Chat</h1>

      <div
        style={{
          width:"400px",
          margin:"20px auto",
          border:"1px solid #ccc",
          borderRadius:"10px",
          padding:"10px",
          minHeight:"200px"
        }}
      >
        {messages.map((m,index)=>(
          <p key={index}>{m}</p>
        ))}
      </div>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter message"
          value={msg}
          onChange={(e)=>setMsg(e.target.value)}
        />

        <button type="submit">Send</button>

      </form>

    </div>
  )
}

export default App