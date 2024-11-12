import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './components/appbar';
import LockerDashboard from './components/home';
import LockerTable from './components/locker';


function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<LockerDashboard />} />
        <Route path="/casillero" element={<LockerTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
