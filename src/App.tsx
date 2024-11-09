import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProfileHome from './component/profile/profileHome'
import VoiceRecorder from './component/talking/talking'
import Login from './component/home/login'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<ProfileHome />} />
        <Route path="/home" element={<VoiceRecorder />} />
      </Routes>
    </Router>
  )
}

export default App
