import React from 'react';

import { Link } from 'react-router-dom';

import classes from './styles.module.scss';
import properyPlaceholder from '../../../assets/images/propertyPlaceholder.png';

export default function Item() {
  return (
    <Link to="/buy" className={classes.Item}>
      <div className={classes.container}>
        <img src={properyPlaceholder} alt="" />
        <h1>Title</h1>
      </div>
    </Link>
  );
}
