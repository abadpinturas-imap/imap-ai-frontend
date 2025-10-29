import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/DashboardPage'
import EmailDetail from './pages/EmailDetail'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/email/:id" element={<EmailDetail />} />
      </Routes>
    </BrowserRouter>
  )
}