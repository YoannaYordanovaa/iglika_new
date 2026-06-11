import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import JoinTeam from './pages/JoinTeam'
import Terms from './pages/Terms'


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produkti" element={<Products />} />
        <Route path="/prisaedini-se" element={<JoinTeam />} />
        <Route path="/obshti-uslovia" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  )
}