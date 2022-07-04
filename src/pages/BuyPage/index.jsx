import React, { useState } from 'react';

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

  return (
    <div className={classes.BuyPage}>
      <div className={classes.filtersContainer}>
        <Filters
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
      <div className={classes.propertyListContainer}>
        <PropertyList title="Available options" />
      </div>
      <div className={classes.propertyListContainer}>
        <PropertyList title="Added recently" />
      </div>
    </div>
  );
}
