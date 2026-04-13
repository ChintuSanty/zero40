import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Zero40HomePage from './Zero40HomePage.jsx'
import BrewfastClub from './BrewfastClub.jsx'
import OurBrewery from './OurBrewery.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Zero40HomePage />} />
        <Route path="/z40-brewfast-club" element={<BrewfastClub />} />
        <Route path="/our-brewery" element={<OurBrewery />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
