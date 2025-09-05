import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Layout general
import ContentRenderer from './layouts/contentRenderer'
import PublicLayout from './layouts/PublicLayout' 

// Vistas públicas
import Home from './layouts/homeContent'
import Documents from './layouts/documents'
import News from './layouts/news'
import LoginContent from './layouts/login'

// Componentes relacionimport News from './layouts/news'ados a documentos
import DocumentBarLayout from './layouts/DocumentBarLayout'

import CreateDocument from './components/uploadDocument';
import SignInForm from './layouts/sign';
import UserActivationTable from './layouts/userActivationList';
import ProfilePanel from './layouts/profileDetail'

// Vista de gestión de noticias
import NewsManager from './pages/NewsManager'

function App() {
  const [count, setCount] = useState(0)
  const [folderID, setFolderID] = useState(null)

  return (
    <Router>

    <Routes>
          <Route path="/" element={<ContentRenderer> <Home/></ContentRenderer>} />
          <Route path="/documentos" element={<ContentRenderer><DocumentBarLayout folderState={setFolderID}></DocumentBarLayout> <Documents folder_id={folderID}/> <CreateDocument/></ContentRenderer>} />
          <Route path="/noticias" element={<ContentRenderer> <News/></ContentRenderer>} />
          <Route path="/login" element={<ContentRenderer> <LoginContent/></ContentRenderer>} />
          <Route path="/signIn" element={<ContentRenderer> <SignInForm/></ContentRenderer>} />
          <Route path="/activation" element={<ContentRenderer> <UserActivationTable/></ContentRenderer>} />
          <Route path="/profile" element={<ContentRenderer> 
            <ProfilePanel/>
          </ContentRenderer>} />
        <Route
          path="/gestor-noticias"
          element={
            <ContentRenderer>
              <NewsManager />
            </ContentRenderer>
          }
        />
      </Routes>
    </Router>
  )
}

export default App