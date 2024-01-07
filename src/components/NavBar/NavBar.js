// NavBar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to='/' className='logo'>
        <img src='./GmlBlack.png' alt='GML Logo' />
      </Link>

      <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/sales'>Sales</NavLink>
        </li>
        <li>
          <NavLink to='/sales-record'>Sales Record</NavLink>
        </li>
        <li>
          <NavLink to='/signin'>Sign In</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;