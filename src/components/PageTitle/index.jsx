import classNames from 'classnames';
import React from 'react';

import { t } from '../../i18n';

import classes from './styles.module.scss';

export default function PageTitle({ title, about }) {
  console.log(about);
  return (
    <div className={classNames(classes.PageTitle, about && classes.about)}>
      <div className={classes.container}>
        {title ? (
          <h1>{title}</h1>
        ) : (
          <h1>
            {t('Sell with')} <span className={classes.accent}>Sun</span>
          </h1>
        )}
      </div>
    </div>
  );
}
