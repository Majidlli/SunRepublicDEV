import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import MultiClamp from 'react-multi-clamp';

import i18n, { t } from '../../../i18n';
import Button from '../../Button';
import { STATIC_URL } from '../../../constants/main';
import classes from './styles.module.scss';

export default function Property({
  propertyWidth,
  propertyCount,
  propertyData,
}) {
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  let { title } = propertyData;
  let { description } = propertyData;

  if (i18n.language === 'en') {
    title = propertyData.title || propertyData.titleRus;
    description = propertyData.description || propertyData.descriptionRus;
  } else if (i18n.language === 'ru') {
    title = propertyData.titleRus || propertyData.title;
    description = propertyData.descriptionRus || propertyData.description;
  }

  return (
    <div
      className={classes.Property}
      style={{ width: propertyCount >= 3 ? propertyWidth : '' }}
    >
      <div
        className={classes.zoom}
        style={{
          backgroundImage: `url(${STATIC_URL}${propertyData.Images?.[0]?.path})`,
          transform: isHovering ? 'scale(1.4)' : '',
          display: isHovering ? 'block' : 'none',
          zIndex: isHovering ? '10' : '',
        }}
        onClick={() => navigate(`/property/${propertyData.id}`)}
      />
      <header
        style={{
          backgroundImage: `url(${STATIC_URL}${propertyData.Images?.[0]?.path})`,
          cursor: 'pointer',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/property/${propertyData.id}`)}
      >
        <Button
          style={{
            width: 126,
            borderRadius: 6,
          }}
          onClick={() => navigate(`/property/${propertyData.id}`)}
        >
          {t('DETAILS')}
        </Button>
      </header>
      <div className={classes.info}>
        <h1>
          <MultiClamp clamp={1}>{title}</MultiClamp>
        </h1>
        <MultiClamp className={classes.description} clamp={2}>
          {description}
        </MultiClamp>
      </div>
    </div>
  );
}
