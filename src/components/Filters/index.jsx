import React, { useState, useEffect } from 'react';

import Button from '../Button';
import Select from '../Select';

import classes from './styles.module.scss';

export default function Filters({
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  area,
  setArea,
  hasPool,
  setHasPool,
  hasHOAFee,
  setHasHOAFee,
  type,
  setType,
  region,
  setRegion,
  floorCount,
  setFloorCount,
}) {
  const [maxPriceOptions, setMaxPriceOptions] = useState([
    100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000,
    1000000,
  ]);

  useEffect(() => {
    const prices = [
      100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000,
      1000000,
    ];

    const maxPrices = [];

    prices.forEach((price) => {
      if (price >= minPrice) {
        maxPrices.push(price);
      }
    });

    setMaxPriceOptions(maxPrices);
  }, [minPrice]);

  useEffect(() => {
    if (minPrice > maxPrice) {
      setMaxPrice('');
    }
  }, [minPrice]);

  return (
    <div className={classes.Filters}>
      <div className={classes.col}>
        <Select
          label="Bedrooms"
          placeholder="Any"
          value={bedrooms}
          setValue={setBedrooms}
          options={[1, 2, 3, 4, 5]}
        />
        <Select
          label="Bathrooms"
          placeholder="Any"
          value={bathrooms}
          setValue={setBathrooms}
          options={[1, 2, 3, 4, 5]}
        />
        <div className={classes.shortSelects}>
          <Select
            label="Price"
            placeholder="From"
            value={minPrice}
            setValue={setMinPrice}
            options={[
              1, 100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000,
              900000, 1000000,
            ]}
          />
          <Select
            label="&nbsp;"
            placeholder="To"
            value={maxPrice}
            setValue={setMaxPrice}
            options={maxPriceOptions}
          />
        </div>
      </div>
      <div className={classes.col}>
        <Select
          label="Squaree Feet"
          placeholder="Any"
          value={area}
          setValue={setArea}
          options={[1, 2, 3, 4, 5]}
        />
        <Select
          label="Pool"
          placeholder="All"
          value={hasPool}
          setValue={setHasPool}
          options={['All', 'Pool', 'No Pool']}
        />
        <Select
          label="HOA Fee"
          placeholder="Any"
          value={hasHOAFee}
          setValue={setHasHOAFee}
          options={['Any', 'HOA Fee', 'No Fee']}
        />
      </div>
      <div className={classes.col}>
        <Select
          label="Type"
          placeholder="Any"
          value={type}
          setValue={setType}
          options={['Single Family', 'Townhouse', 'Condo', 'Other']}
        />
        <Select
          label="Region"
          placeholder="Any"
          value={region}
          setValue={setRegion}
          options={['Any']}
        />
        <Select
          label="Floor Count"
          placeholder="Any"
          value={floorCount}
          setValue={setFloorCount}
          options={[1, 2, 3, 4, 5]}
        />
        <div className={classes.buttonContainer}>
          <Button>SEARCH</Button>
        </div>
      </div>
    </div>
  );
}
