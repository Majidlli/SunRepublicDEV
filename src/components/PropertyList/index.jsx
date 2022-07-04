import React from 'react';

import classes from './styles.module.scss';

export default function PropertyList({ title }) {
  return (
    <div className={classes.PropertyList}>
      <h2>{title}</h2>
      <div className={classes.listContainer}>
        <button type="button" className={classes.previous}>
          1
        </button>
        <ul className={classes.list}>
          <li>22</li>
        </ul>
        <button type="button">1</button>
      </div>
    </div>
  );
}
