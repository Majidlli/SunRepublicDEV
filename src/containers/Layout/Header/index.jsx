import React from 'react';

import { NavLink, Link } from 'react-router-dom';

import useSwitchLanguage from '../../../hooks/useSwitchLanguage';
import i18n, { t } from '../../../i18n';
import logoHeader from '../../../assets/images/logoHeader.png';
import classes from './styles.module.scss';

export default function Header() {
  const changeLanguage = useSwitchLanguage();

  return (
    <header className={classes.Header}>
      <div className={classes.container}>
        <nav className={classes.navigationMenu}>
          <ul>
            <li>
              <Link to="/" className={classes.link}>
                <img src={logoHeader} alt="Logo" />
              </Link>
            </li>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {t('HOME')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/buy"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {t('BUY')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/rent"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {t('RENT')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sell"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {t('SELL')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/what-we-sell"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {t('WHAT WE SELL')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {t('CONTACT US')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                {t('ABOUT')}
              </NavLink>
            </li>
          </ul>
        </nav>
        <a className={classes.phone} href="tel:(123) 000 0110">
          (123) 000 0110
        </a>
      </div>
      <div className={classes.languageSwitcher} onClick={changeLanguage}>
        {i18n.language}
      </div>
    </header>
  );
}
