import { Routes, Route, Navigate } from 'react-router-dom'
import BuilderPage from './pages/BuilderPage'
import ProfitCheckPage from './pages/ProfitCheckPage'
import PremiumSuccessPage from './pages/PremiumSuccessPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<BuilderPage />} />
      <Route path="/builder" element={<BuilderPage />} />
      <Route path="/profit-check" element={<ProfitCheckPage />} />
      <Route path="/premium/success" element={<PremiumSuccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}