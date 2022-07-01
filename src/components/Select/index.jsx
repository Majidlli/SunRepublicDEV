import classNames from 'classnames';
import React, { useState, useRef } from 'react';

import useOnClickOutside from '../../hooks/useOnClickOutside';
import classes from './styles.module.scss';

export default function Select({
  label,
  options = [],
  placeholder,
  value,
  setValue,
}) {
  const [isOptionsListVisible, setIsOptionsListVisible] = useState(false);

  const optionsRef = useRef();
  const selectorRef = useRef();

  useOnClickOutside(
    optionsRef,
    () => setIsOptionsListVisible(false),
    selectorRef
  );

  return (
    <div className={classes.Select}>
      <span className={classes.label}>{label}</span>
      <div
        className={classNames(
          classes.selector,
          isOptionsListVisible && classes.open
        )}
        onClick={() => setIsOptionsListVisible((prevState) => !prevState)}
        ref={selectorRef}
      >
        {value || placeholder}
      </div>
      {isOptionsListVisible && (
        <div className={classes.options} ref={optionsRef}>
          {options.map((option) => {
            return (
              <div
                className={classes.option}
                key={option}
                onClick={() => {
                  setValue(option);
                  setIsOptionsListVisible(false);
                }}
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
