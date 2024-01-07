// App.js
import React from 'react';
import "./App.css";
import { NavBar } from './components/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import { SalesForm } from './components/SalesForm/SalesForm';
import SalesRecord from './components/SalesRecord/SalesRecord'; // Adjust the path based on your project structure

const App = () => {
  return( 
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<SalesForm />} />
        <Route path='/sales-record' element={<SalesRecord />} />
      </Routes>
    </div>
  );
};

export default App;
