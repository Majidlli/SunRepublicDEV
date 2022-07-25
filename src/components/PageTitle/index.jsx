import classNames from 'classnames';
import React from 'react';

import classes from './styles.module.scss';

export default function PageTitle({ title, about = 'Sun' }) {
  return (
    <div className={classNames(classes.PageTitle, about && classes.about)}>
      <div className={classes.container}>
        <h1>
          {title}
          <span className={classes.accent}> {about}</span>
        </h1>
      </div>
    </div>
  );
}
