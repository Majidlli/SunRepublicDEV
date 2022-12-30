/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import classNames from 'classnames';
// import { useNavigate } from 'react-router-dom';

import classes from './styles.module.scss';

export default function BlogButton({ image, title, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  console.log(isActive);
  // const navigate = useNavigate();
  return (
    <li
      className={classNames(classes.BlogButton, {
        [classes.hovered]: isHovered,
      })}
      onClick={() =>
        document.getElementById(title).scrollIntoView({ behavior: 'smooth' })
      }
    >
      <span
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {title}
      </span>
      <div className={classes.buttonContainer}>
        <div
          className={classes.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img src={image} alt={title} />
        </div>
      </div>
    </li>
  );
}
