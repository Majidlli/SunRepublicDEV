import React from 'react';

import { useNavigate } from 'react-router-dom';
import Truncate from 'react-truncate';

import Button from '../../Button';
import { STATIC_URL } from '../../../constants/main';
import classes from './styles.module.scss';

export default function Property({
  propertyWidth,
  propertyCount,
  propertyData,
}) {
  const navigate = useNavigate();

  return (
    <div
      className={classes.Property}
      style={{ width: propertyCount >= 3 ? propertyWidth : '' }}
    >
      <header
        style={{
          backgroundImage: `url(${STATIC_URL}${propertyData.Images?.[0]?.path})`,
        }}
      >
        <Button
          style={{ width: 126, borderRadius: 6 }}
          onClick={() => navigate(`/property/${propertyData.id}`)}
        >
          DETAILS
        </Button>
      </header>
      <div className={classes.info}>
        <h1>
          <Truncate lines={1}>{propertyData.title}</Truncate>
        </h1>
        <p>
          <Truncate lines={2}>{propertyData.description}</Truncate>
        </p>
      </div>
    </div>
  );
}
