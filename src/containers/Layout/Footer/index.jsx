/* eslint-disable no-alert */
import React from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

import instagramIcon from '../../../assets/images/instagram.svg';
import facebookIcon from '../../../assets/images/facebook.svg';
import classes from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={classes.Footer}>
      <div className={classes.container}>
        <div className={classNames(classes.col, classes.first)}>
          <a className={classes.phone} href="tel:(123) 000 0110">
            (123) 000 0110
          </a>
          <small>© 2010-2022 by Sunrepublic.</small>
        </div>
        <div className={classNames(classes.col, classes.second)}>
          <ul>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/buy">BUY</Link>
            </li>
            <li>
              <Link to="/rent">RENT</Link>
            </li>
            <li>
              <Link to="/sell">SELL</Link>
            </li>
          </ul>
        </div>
        <div className={classNames(classes.col, classes.third)}>
          <ul>
            <li>
              <Link to="/what-we-sell">WHAT WE SELL</Link>
            </li>
            <li>
              <Link to="/contact-us">CONTACT US</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
          </ul>
        </div>
        <div className={classNames(classes.col, classes.fourth)}>
          <div>
            <img src={instagramIcon} alt="Instagram" />
            <span>Instagram</span>
          </div>
          <div>
            <img src={facebookIcon} alt="Facebook" />
            <span>Facebook</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
