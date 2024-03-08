import React from 'react';
import "./App.css";
import { NavBar } from './components/NavBar/NavBar';
import { Dashboard } from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { SalesHistory } from './components/SalesRecord/SalesHistory.tsx'; // Adjust path
import { StockRecord } from './components/SalesRecord/StockRecord';
import { StockInput } from './components/SalesForm/StockInput';
import { Refund } from './components/Refund';

const App = () => {
  

  return (
    <div style={{
      backgroundImage: `url(${require('./BMFBgImage.jpg')})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      minHeight: '100vh' // Ensure full height
    }}>
      <div className="main-container">
      <NavBar />
      <div className="content-area">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sales-history" element={<SalesHistory />} />
          <Route path="/stock-record" element={<StockRecord />} />
          <Route path="/stock-input" element={<StockInput />} />
          <Route path="/refund" element={<Refund />} />
        </Routes>
      </div>
    </div>
    </div>
    
  );
}

export default App;
