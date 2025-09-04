import { BrowserRouter, Routes, Route } from "react-router-dom"
import NewsManager from "./pages/NewsManager"
import News from "./pages/News"
import Home from "./pages/Home"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gestor" element={<NewsManager />} />
        <Route path="/noticias" element={<News />} />
      </Routes>
    </BrowserRouter>
  )
}