import React from 'react';

import classes from './styles.module.scss';

export default function TextInput({
  name,
  label,
  placeholder,
  onBlur,
  onChange,
  value,
}) {
  return (
    <div className={classes.TextInput}>
      <span className={classes.label}>{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
