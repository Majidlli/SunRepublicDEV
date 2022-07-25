import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import classes from '../../pages/AboutPage/styles.module.scss';
import { t } from '../../i18n';

export default function RenderTeam({ img, name, email, phone }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/contact-us');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <li>
      <div className={classes.photoContainer}>
        <img src={img} alt={name} />
        <div className={classes.buttonContainer}>
          <Button onClick={handleClick}>{t('CONTACT')}</Button>
        </div>
      </div>
      <h1>{t(name)}</h1>
      <p>
        <a href={`mailto:${email}`}>{email}</a>
        <br />
        <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
      </p>
    </li>
  );
}
