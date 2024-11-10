import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import AuthCallback from './component/auth/callback'
import LoginPage from './component/home/login'
import ProfileHome from './component/profile/profileHome'
import Results from './component/results/results'
import Talking from './component/talking/talking'
import TestingFile from './component/testing/testingFile'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<ProfileHome />} />
        <Route path="/recording" element={<Talking />} />
        <Route path="/results" element={<Results />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/testing" element={<TestingFile />} />
      </Routes>
    </Router>
  )
}

export default App
