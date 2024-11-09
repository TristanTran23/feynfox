import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProfileHome from './component/profile/profileHome'
import VoiceRecorder from './component/talking/talking'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VoiceRecorder />} />
        <Route path="/profile" element={<ProfileHome />} />
      </Routes>
    </Router>
  )
}

export default App
