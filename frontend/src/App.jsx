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

/*
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import './App.css'
const socket = io()

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

export default App*/

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ViewUsers from './pages/ViewUsers';
import Chat from './pages/Chat';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Topbar from './components/Topbar';
import './App.css';
import './styles/auth.css';
import './styles/dashboard.css';

const AuthLayout = ({ children }) => (
  <div className="page">
    <div className="auth-frame">
      <div className="topbar topbar-floating">
        <Topbar />
      </div>
      {children}
    </div>
  </div>
);

const DashboardLayout = ({ children }) => (
  <div className="page dashboard-wrap">
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <Topbar />
        <Header />
        <div className="route-surface">{children}</div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [isAuthed, setIsAuthed] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<AuthLayout><Login onLogin={() => setIsAuthed(true)} /></AuthLayout>}
        />
        <Route
          path="/signup"
          element={<AuthLayout><Signup /></AuthLayout>}
        />
        <Route
          path="/users"
          element={<DashboardLayout><ViewUsers /></DashboardLayout>}
        />
        <Route
          path="/chat"
          element={isAuthed
            ? <DashboardLayout><Chat /></DashboardLayout>
            : <Navigate to="/login" replace />}
        />
        <Route
          path="/"
          element={<DashboardLayout><Home /></DashboardLayout>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

