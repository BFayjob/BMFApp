// NavBar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css'

export const NavBar = () => {
  const [menuOpen] = useState(false);

  return (
    <nav>
      <Link to='/' className='logo'>
        <img src='./GmlBlack.png' alt='GML Logo' />
      </Link>

      

      <ul className={menuOpen ? 'open' : ''}>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        {/* <li>
          <NavLink to='/sales'>Sales</NavLink>
        </li> */}
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
