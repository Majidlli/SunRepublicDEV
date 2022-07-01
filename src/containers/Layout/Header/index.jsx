import React from 'react';

import { NavLink } from 'react-router-dom';

import classes from './styles.module.scss';

export default function Header() {
  return (
    <header className={classes.Header}>
      <nav className={classes.navigationMenu}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/buy"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              BUY
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rent"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              RENT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sell"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              SELL
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/what-we-sell"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              WHAT WE SELL
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact-us"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              CONTACT US
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              ABOUT
            </NavLink>
          </li>
        </ul>
      </nav>
      <a className={classes.phone} href="tel:(123) 000 0110">
        (123) 000 0110
      </a>
    </header>
  );
}
