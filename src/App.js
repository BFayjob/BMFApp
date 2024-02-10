import React from 'react';
import "./App.css";
import { NavBar } from './components/NavBar/NavBar';
import { Dashboard } from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import { SalesHistory } from './components/SalesRecord/SalesHistory'; // Adjust path
import { StockRecord } from './components/SalesRecord/StockRecord';
import { StockInput } from './components/SalesForm/StockInput';
import { SignIn } from './components/SignIn/SignIn';

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
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>
    </div>
    </div>
    
  );
}

export default App;
