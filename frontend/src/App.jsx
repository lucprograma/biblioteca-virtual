import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Layout general
import ContentRenderer from './layouts/contentRenderer'
import PublicLayout from './layouts/PublicLayout' // ✅ Import agregado

// Vistas públicas
import Home from './layouts/homeContent'
import Documents from './layouts/documents'
import News from './pages/News'
import LoginContent from './layouts/login'

// Componentes relacionados a documentos
import DocumentBarLayout from './layouts/DocumentBarLayout'
import CreateDocument from './components/uploadDocument'

// Vista de gestión de noticias
import NewsManager from './pages/NewsManager'

function App() {
  const [count, setCount] = useState(0)
  const [folderID, setFolderID] = useState(null)

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ContentRenderer>
              <Home />
            </ContentRenderer>
          }
        />
        <Route
          path="/documentos"
          element={
            <ContentRenderer>
              <DocumentBarLayout folderState={setFolderID} />
              <Documents folder_id={folderID} />
              <CreateDocument />
            </ContentRenderer>
          }
        />
        <Route
          path="/noticias"
          element={
            <PublicLayout>
              <News />
            </PublicLayout>
          }
        />
        <Route
          path="/gestor-noticias"
          element={
            <ContentRenderer>
              <NewsManager />
            </ContentRenderer>
          }
        />
        <Route
          path="/login"
          element={
            <ContentRenderer>
              <LoginContent />
            </ContentRenderer>
          }
        />
      </Routes>
    </Router>
  )
}

export default App