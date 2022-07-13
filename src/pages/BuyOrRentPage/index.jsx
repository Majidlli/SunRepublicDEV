import React, { useState, useRef } from 'react';

import PropertyList from '../../components/PropertyList';
import Filters from '../../components/Filters';
import { t } from '../../i18n';
import classes from './styles.module.scss';

export default function BuyOrRentPage({ currentPage }) {
  const [bedrooms, setBedrooms] = useState('');
  const [bedroomsRent, setBedroomsRent] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [bathroomsRent, setBathroomsRent] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [minPriceRent, setMinPriceRent] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [maxPriceRent, setMaxPriceRent] = useState('');
  const [area, setArea] = useState('');
  const [areaRent, setAreaRent] = useState('');
  const [hasPool, setHasPool] = useState('');
  const [hasPoolRent, setHasPoolRent] = useState('');
  const [type, setType] = useState('');
  const [typeRent, setTypeRent] = useState('');
  const [region, setRegion] = useState('');
  const [regionRent, setRegionRent] = useState('');
  const [floorCount, setFloorCount] = useState('');
  const [floorCountRent, setFloorCountRent] = useState('');
  const [searchKey, setSearchKey] = useState(null);
  const [searchKeyRent, setSearchKeyRent] = useState(null);

  const filtersRef = useRef();
  const filtersRefRent = useRef();

  return (
    <div className={classes.BuyOrRentPage}>
      <div className={classes.filtersContainer}>
        {currentPage === 'sell' && (
          <Filters
            setSearchKey={setSearchKey}
            filtersRef={filtersRef}
            bedrooms={bedrooms}
            setBedrooms={setBedrooms}
            bathrooms={bathrooms}
            setBathrooms={setBathrooms}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            area={area}
            setArea={setArea}
            hasPool={hasPool}
            setHasPool={setHasPool}
            type={type}
            setType={setType}
            region={region}
            setRegion={setRegion}
            floorCount={floorCount}
            setFloorCount={setFloorCount}
          />
        )}
        {currentPage === 'rent' && (
          <Filters
            setSearchKey={setSearchKeyRent}
            filtersRef={filtersRefRent}
            bedrooms={bedroomsRent}
            setBedrooms={setBedroomsRent}
            bathrooms={bathroomsRent}
            setBathrooms={setBathroomsRent}
            minPrice={minPriceRent}
            setMinPrice={setMinPriceRent}
            maxPrice={maxPriceRent}
            setMaxPrice={setMaxPriceRent}
            area={areaRent}
            setArea={setAreaRent}
            hasPool={hasPoolRent}
            setHasPool={setHasPoolRent}
            type={typeRent}
            setType={setTypeRent}
            region={regionRent}
            setRegion={setRegionRent}
            floorCount={floorCountRent}
            setFloorCount={setFloorCountRent}
          />
        )}
      </div>
      <div className={classes.mainContent}>
        <div className={classes.propertyListContainer}>
          {currentPage === 'sell' && (
            <PropertyList
              title={t('Available options')}
              filtersRef={filtersRef}
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              minPrice={minPrice}
              maxPrice={maxPrice}
              area={area}
              hasPool={hasPool}
              type={type}
              region={region}
              floorCount={floorCount}
              searchKey={searchKey}
              queryName="property"
              action="sell"
              currentPage={currentPage}
            />
          )}
          {currentPage === 'rent' && (
            <PropertyList
              title={t('Available options')}
              filtersRef={filtersRefRent}
              bedrooms={bedroomsRent}
              bathrooms={bathroomsRent}
              minPrice={minPriceRent}
              maxPrice={maxPriceRent}
              area={areaRent}
              hasPool={hasPoolRent}
              type={typeRent}
              region={regionRent}
              floorCount={floorCountRent}
              searchKey={searchKeyRent}
              queryName="rentProperty"
              action="rent"
              currentPage={currentPage}
            />
          )}
        </div>
        <div className={classes.propertyListContainer}>
          <PropertyList
            title={t('Added recently')}
            filtersRef={filtersRef}
            queryName={
              currentPage === 'rent' ? 'recentRentProperty' : 'recentProperty'
            }
            action={currentPage === 'rent' ? 'rent' : 'sell'}
            recent
          />
        </div>
      </div>
    </div>
  );
}
