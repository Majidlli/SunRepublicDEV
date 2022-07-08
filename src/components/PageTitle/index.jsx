import React from 'react';

import classes from './styles.module.scss';

export default function PageTitle({ title }) {
  return (
    <div className={classes.PageTitle}>
      <div className={classes.container}>
        {title ? (
          <h1>{title}</h1>
        ) : (
          <h1>
            Sell with <span>Sun</span>
          </h1>
        )}
      </div>
    </div>
  );
}
