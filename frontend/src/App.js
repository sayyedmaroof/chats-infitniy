import { Button } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Chat from './Pages/Chat'
import Home from './Pages/Home'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/chat" element={<Chat />} />

        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
