import React from 'react';

import { useNavigate } from 'react-router-dom';
import Truncate from 'react-truncate';

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
      <header
        style={{
          backgroundImage: `url(${STATIC_URL}${propertyData.Images?.[0]?.path})`,
        }}
      >
        <Button
          style={{ width: 126, borderRadius: 6 }}
          onClick={() => navigate(`/property/${propertyData.id}`)}
        >
          {t('DETAILS')}
        </Button>
      </header>
      <div className={classes.info}>
        <h1>
          <Truncate lines={1}>{title}</Truncate>
        </h1>
        <p>
          <Truncate lines={2}>{description}</Truncate>
        </p>
      </div>
    </div>
  );
}
