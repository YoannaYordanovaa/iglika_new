import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import JoinTeam from './pages/JoinTeam'
import Terms from './pages/Terms'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }, 0)
  }, [pathname])
  return null
}


export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/join" element={<JoinTeam />} />
        <Route path="/Terms-and-Conditions" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  )
}