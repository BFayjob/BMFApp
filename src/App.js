// App.js
import React from 'react';
import "./App.css";
import { NavBar } from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import { SalesForm } from './components/SalesForm/SalesForm';
import {SalesRecord} from './components/SalesRecord/SalesRecord'; // Adjust the path based on your project structure
import {StockRecord} from './components/SalesRecord/StockRecord';
import {StockInput} from './components/SalesForm/StockInput';
import {SignIn} from './components/SignIn/SignIn';

const App = () => {
  return( 
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<SalesForm />} />
        <Route path='/sales-record' element={<SalesRecord />} />
        <Route path='/stock-record' element={<StockRecord />} />
        <Route path='/stock-input' element={<StockInput />} />
        <Route path='/signin' element={<SignIn />} />




      </Routes>
    </div>
  );
};

export default App;
