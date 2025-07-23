import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './layouts/homeContent'
import Navbar from './components/navbar'
import Documents from './layouts/documents'
import ContentRenderer from './layouts/contentRenderer'
import News from './layouts/news'
import LoginContent from './layouts/login'
import DocumentBarLayout from './layouts/DocumentBarLayout'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
    <Routes>
          <Route path="/" element={<ContentRenderer> <Home/></ContentRenderer>} />
          <Route path="/documentos" element={<ContentRenderer><DocumentBarLayout></DocumentBarLayout> <Documents/></ContentRenderer>} />
          <Route path="/noticias" element={<ContentRenderer> <News/></ContentRenderer>} />
          <Route path="/login" element={<ContentRenderer> <LoginContent/></ContentRenderer>} />
    </Routes>
    </Router>
  )
}

export default App
