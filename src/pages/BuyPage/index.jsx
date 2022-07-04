import React, { useState, useRef } from 'react';

import PropertyList from '../../components/PropertyList';
import Filters from '../../components/Filters';

import classes from './styles.module.scss';

export default function BuyPage() {
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [area, setArea] = useState('');
  const [hasPool, setHasPool] = useState('');
  const [hasHOAFee, setHasHOAFee] = useState('');
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');
  const [floorCount, setFloorCount] = useState('');
  const [searchKey, setSearchKey] = useState(null);

  const filtersRef = useRef();

  return (
    <div className={classes.BuyPage}>
      <div className={classes.filtersContainer}>
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
          hasHOAFee={hasHOAFee}
          setHasHOAFee={setHasHOAFee}
          type={type}
          setType={setType}
          region={region}
          setRegion={setRegion}
          floorCount={floorCount}
          setFloorCount={setFloorCount}
        />
      </div>
      <div className={classes.mainContent}>
        <div className={classes.propertyListContainer}>
          <PropertyList
            title="Available options"
            filtersRef={filtersRef}
            bedrooms={bedrooms}
            bathrooms={bathrooms}
            minPrice={minPrice}
            maxPrice={maxPrice}
            area={area}
            hasPool={hasPool}
            hasHOAFee={hasHOAFee}
            type={type}
            region={region}
            floorCount={floorCount}
            searchKey={searchKey}
            queryName="property"
          />
        </div>
        <div className={classes.propertyListContainer}>
          <PropertyList
            title="Added recently"
            filtersRef={filtersRef}
            queryName="recentProperty"
            recent
          />
        </div>
      </div>
    </div>
  );
}
