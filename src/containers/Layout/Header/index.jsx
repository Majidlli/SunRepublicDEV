import React, { useState, useRef } from 'react';

import { NavLink, Link } from 'react-router-dom';

import classNames from 'classnames';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import useSwitchLanguage from '../../../hooks/useSwitchLanguage';
import i18n, { t } from '../../../i18n';
import logoHeader from '../../../assets/images/logoHeader.png';
import russianFlag from '../../../assets/images/russia.svg';
import ukFlag from '../../../assets/images/uk.svg';
import classes from './styles.module.scss';

export default function Header() {
  const [isLanguagesListVisible, setIsLanguagesListVisible] = useState(false);

  const changeLanguage = useSwitchLanguage();

  const languageSwitcherRef = useRef();

  useOnClickOutside(languageSwitcherRef, () =>
    setIsLanguagesListVisible(false)
  );

  return (
    <header
      className={classNames(
        classes.Header,
        i18n.language === 'ru' && classes.russian
      )}
    >
      <Link to="/" className={classes.link}>
        <img src={logoHeader} alt="Logo" className={classes.logo} />
      </Link>
      <div className={classes.container}>
        <nav className={classes.navigationMenu}>
          <ul>
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
      <div
        className={classes.languageSwitcher}
        ref={languageSwitcherRef}
        onClick={() => setIsLanguagesListVisible((prevState) => !prevState)}
      >
        {i18n.language === 'en' ? (
          <img src={ukFlag} alt="Flag of UK" />
        ) : (
          <img src={russianFlag} alt="Flag of Russia" />
        )}
        <span>{i18n.language}</span>
        {isLanguagesListVisible && (
          <div className={classes.languagesList}>
            <div
              onClick={() => {
                changeLanguage('ru');
              }}
            >
              <img src={russianFlag} alt="Flag of Russia" />
              RU
            </div>
            <div onClick={() => changeLanguage('en')}>
              <img src={ukFlag} alt="Flag of UK" /> EN
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
