import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from './components/Container'
import { Navbar } from './components/Navbar'
import { Dashboard } from './Views/Dashboard'
import { Home } from './Views/Home'

function App () {
  const maxWidth = '1200px'
  return <>
    <Container maxWidth={maxWidth} >
      <Navbar />
    </Container>
    <Container maxWidth={maxWidth} >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Container>
  </>
}

export default App
