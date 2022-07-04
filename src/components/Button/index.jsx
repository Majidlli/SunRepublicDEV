import React from 'react';

import classes from './styles.module.scss';

export default function Button({ children, onClick, style }) {
  return (
    <button
      type="button"
      className={classes.Button}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
