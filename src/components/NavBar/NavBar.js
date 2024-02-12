import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <header className="bg-green-900 text-white fixed top-0 left-0 right-0 w-full px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <img src="./GmlBlack.png" alt="GML Logo" />
        <span className="font-bold">GML</span>
      </Link>

      <nav className="flex items-center space-x-6 underline hover:underline-offset-4">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/sales-history">Sales History</NavLink>
        </li>
        <li>
          <NavLink to="/stock-record">Stock Record</NavLink>
        </li>
        <li>
          <NavLink to="/stock-input">Stock Input</NavLink>
        </li>
        <li>
          <NavLink to="/Refund">Refund</NavLink>
        </li>
      </nav>
    </header>
  );
};

export default NavBar;
