import React from 'react';

import { useNavigate } from 'react-router-dom';
import MultiClamp from 'react-multi-clamp';

import i18n, { t } from '../../../i18n';
import { STATIC_URL } from '../../../constants/main';
import classes from './styles.module.scss';

export default function Property({ propertyData }) {
  const navigate = useNavigate();

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
      onClick={() => navigate(`/property/${propertyData.id}`)}
    >
      <header
        style={{
          backgroundImage: `url(${STATIC_URL}${propertyData.Images?.[0]?.path})`,
        }}
      >
        <button
          type="button"
          onClick={() => navigate(`/property/${propertyData.id}`)}
        >
          {t('DETAILS')}
        </button>
      </header>
      <div className={classes.info}>
        <h1 className={classes.propertyTitle}>
          <MultiClamp clamp={1}>{title}</MultiClamp>
        </h1>
        <MultiClamp className={classes.description} clamp={2}>
          {description}
        </MultiClamp>
      </div>
    </div>
  );
}
