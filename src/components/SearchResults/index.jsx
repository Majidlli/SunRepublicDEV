import React from 'react';

import { t } from '../../i18n';
import PropertyList from '../PropertyList';
import classes from './styles.module.scss';

export default function SearchResults({ searchTerm, containerRef }) {
  return (
    <div className={classes.SearchResults}>
      <div className={classes.propertyListContainer}>
        <PropertyList
          title={t('For sale')}
          filtersRef={containerRef}
          searchTerm={searchTerm}
          queryName="searchSell"
          action="sell"
        />
      </div>
      <div className={classes.propertyListContainer}>
        <PropertyList
          title={t('For rent')}
          filtersRef={containerRef}
          queryName="searchRent"
          searchTerm={searchTerm}
          action="rent"
        />
      </div>
    </div>
  );
}
