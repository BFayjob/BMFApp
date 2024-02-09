import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';
import { FaHome, FaHistory, FaArchive, FaUpload, FaUser } from 'react-icons/fa';



export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (isOpen = false) => {
    setIsMenuOpen(isOpen);
  };

  const closeMenu = () => {
    // Close menu when clicking outside
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Close menu on outside click
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
    // eslint-disable-next-line
  }, [isMenuOpen]); // Only add/remove listener when state changes

  const menuClasses = !isMenuOpen ? 'hidden' : ''; // Conditional visibility for mobile


  return (
    <nav className="side-nav fixed top-0 left-0 h-screen w-full md:w-64">
      <Link to="/" className="logo flex items-center">
        <img src="./GmlBlack.png" alt="GML Logo" className="h-8 w-8" />
        <span className="ml-2 text-xl font-bold sm:hidden">GML</span> 
      </Link>

      <button className="menu-button flex items-center justify-center focus:outline-none md:hidden" onClick={() => toggleMenu(!isMenuOpen)}>
        <span className="block h-2 w-4 bg-slate-900 rounded-full"></span>
        <span className="block h-2 w-4 bg-slate-900 rounded-full mt-1"></span>
        <span className="block h-2 w-4 bg-slate-900 rounded-full mt-1"></span>
      </button>

      <ul className={`menu md:block ${menuClasses} overflow-y-auto pb-4`}>
        <li>
          <NavLink to="/" activeClassName="active">
            <span className="icon"><FaHome /></span>
            <span className="text sm:block">Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/sales-history" activeClassName="active">
            <span className="icon"><FaHistory /></span>
            <span className="text sm:block">Sales History</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/stock-record" activeClassName="active">
            <span className="icon"><FaArchive /></span>
            <span className="text sm:block">Stock Record</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/stock-input" activeClassName="active">
            <span className="icon"><FaUpload /></span>
            <span className="text sm:block">Stock Input</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/signin" activeClassName="active">
            <span className="icon"><FaUser /></span>
            <span className="text sm:block">Sign In</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
