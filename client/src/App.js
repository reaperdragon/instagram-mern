import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing,Error,Register } from './pages';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path='*' element={<Error /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App