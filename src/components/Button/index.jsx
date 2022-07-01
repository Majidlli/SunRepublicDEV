import React from 'react';

import classes from './styles.module.scss';

export default function Button({ children }) {
  return (
    <button type="button" className={classes.Button}>
      {children}
    </button>
  );
}
