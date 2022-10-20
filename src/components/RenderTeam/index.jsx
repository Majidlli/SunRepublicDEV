import React from 'react';

import classes from './styles.module.scss';
import { t } from '../../i18n';

export default function RenderTeam({ img, name, email, phone }) {
  return (
    <li className={classes.RenderTeam}>
      <div className={classes.photoContainer}>
        <img src={img} alt={name} />
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
