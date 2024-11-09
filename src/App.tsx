import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import VoiceRecorder from './component/talking/talking'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VoiceRecorder />} />
      </Routes>
    </Router>
  )
}

export default App
