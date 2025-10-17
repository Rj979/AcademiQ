import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Papers from './pages/Papers';
import Attendance from './pages/Attendance';
import InternalMark from './pages/InternalMark';
import TimeSchedule from './pages/TimeSchedule';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: '16px' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/papers" replace />} />
          <Route path="/papers" element={<Papers />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/internal-mark" element={<InternalMark />} />
          <Route path="/time-schedule" element={<TimeSchedule />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
