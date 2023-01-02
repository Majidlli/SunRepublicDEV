/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';

import classNames from 'classnames';
// import { useNavigate } from 'react-router-dom';

import classes from './styles.module.scss';

export default function BlogButton({ image, title, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    console.log(title, ' ', isActive);
  }, [isActive]);
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
          className={isActive ? classes.activeButton : classes.button}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={image}
            alt={title}
            className={isActive ? classes.active : classes.notActive}
          />
        </div>
      </div>
    </li>
  );
}
