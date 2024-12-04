import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ResponsiveAppBar from './components/appbar';
import LockerDashboard from './components/home';
import LockerTable from './components/locker';
import Login from './components/login';
import GestureFileForm from './components/model';


function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<LockerDashboard />} />
        <Route path="/casillero" element={<LockerTable />} />
        <Route path="/login" element={<Login />} />
        <Route path="/model" element={<GestureFileForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
