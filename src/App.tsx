import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LoginPage from './component/home/login'
import ProfileHome from './component/profile/profileHome'
import Results from './component/results/results'
import Talking from './component/talking/talking'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfileHome />} />
        <Route path="/recording" element={<Talking />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  )
}

export default App
