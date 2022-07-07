/* eslint-disable no-alert */
import React from 'react';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { t } from '../../../i18n';
import instagramIcon from '../../../assets/images/instagram.svg';
import facebookIcon from '../../../assets/images/facebook.svg';
import whatsAppIcon from '../../../assets/images/whatsapp.svg';
import logoFooter from '../../../assets/images/logoFooter.png';
import classes from './styles.module.scss';

export default function Footer() {
  return (
    <footer className={classes.Footer}>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <img src={logoFooter} alt="Logo" />
        </div>
        <div className={classes.cols}>
          <div className={classNames(classes.col, classes.first)}>
            <a className={classes.phone} href="tel:(123) 000 0110">
              (123) 000 0110
            </a>
            <small>© 2010-2022 by Sunrepublic.</small>
          </div>
          <div className={classNames(classes.col, classes.second)}>
            <ul>
              <li>
                <Link to="/">{t('HOME')}</Link>
              </li>
              <li>
                <Link to="/buy">{t('BUY')}</Link>
              </li>
              <li>
                <Link to="/rent">{t('RENT')}</Link>
              </li>
              <li>
                <Link to="/sell">{t('SELL')}</Link>
              </li>
            </ul>
          </div>
          <div className={classNames(classes.col, classes.third)}>
            <ul>
              <li>
                <Link to="/what-we-sell">{t('WHAT WE SELL')}</Link>
              </li>
              <li>
                <Link to="/contact-us">{t('CONTACT US')}</Link>
              </li>
              <li>
                <Link to="/about">{t('ABOUT')}</Link>
              </li>
            </ul>
          </div>
          <div className={classNames(classes.col, classes.fourth)}>
            <a
              className={classes.socialLink}
              href="https://www.instagram.com/sunrepublic.vip/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" />
              <span>Instagram</span>
            </a>
            <div>
              <img src={facebookIcon} alt="Facebook" />
              <span>Facebook</span>
            </div>
            <div>
              <img src={whatsAppIcon} alt="WhatsApp" />
              <span>WhatsApp</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
