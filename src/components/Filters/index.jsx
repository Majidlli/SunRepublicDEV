import React, { useState, useEffect } from 'react';

import Button from '../Button';
import Select from '../Select';

import classes from './styles.module.scss';

export default function Filters({
  filtersRef,
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
  setSearchKey,
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
        maxPrices.push({ label: price, value: price });
      }
    });

    setMaxPriceOptions(maxPrices);
  }, [minPrice]);

  useEffect(() => {
    if (minPrice > maxPrice) {
      setMaxPrice('');
    }
  }, [maxPrice, minPrice, setMaxPrice]);

  return (
    <div className={classes.Filters} ref={filtersRef}>
      <div className={classes.col}>
        <Select
          label="Bedrooms"
          placeholder="Any"
          value={bedrooms}
          setValue={setBedrooms}
          options={[
            { label: 'Any', value: '' },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
          ]}
        />
        <Select
          label="Bathrooms"
          placeholder="Any"
          value={bathrooms}
          setValue={setBathrooms}
          options={[
            { label: 'Any', value: '' },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
          ]}
        />
        <div className={classes.shortSelects}>
          <Select
            label="Price"
            placeholder="From"
            value={minPrice}
            setValue={setMinPrice}
            options={[
              { label: 1, value: 1 },
              { label: 100000, value: 100000 },
              { label: 200000, value: 200000 },
              { label: 300000, value: 300000 },
              { label: 400000, value: 400000 },
              { label: 500000, value: 500000 },
              { label: 600000, value: 600000 },
              { label: 700000, value: 700000 },
              { label: 800000, value: 800000 },
              { label: 900000, value: 900000 },
              { label: 1000000, value: 1000000 },
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
          label="Square Feet"
          placeholder="Any"
          value={area}
          setValue={setArea}
          options={[
            { label: 'Any', value: '' },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
          ]}
        />
        <Select
          label="Pool"
          placeholder="All"
          value={hasPool}
          setValue={setHasPool}
          options={[
            { label: 'All', value: '' },
            { label: 'Pool', value: true },
            { label: 'No Pool', value: false },
          ]}
        />
        <Select
          label="HOA Fee"
          placeholder="Any"
          value={hasHOAFee}
          setValue={setHasHOAFee}
          options={[
            { label: 'Any', value: '' },
            { label: 'HOA Fee', value: true },
            { label: 'No Fee', value: false },
          ]}
        />
      </div>
      <div className={classes.col}>
        <Select
          label="Type"
          placeholder="Any"
          value={type}
          setValue={setType}
          options={[
            { label: 'Any', value: '' },
            { label: 'Single Family', value: 'single family' },
            { label: 'Townhouse', value: 'townhouse' },
            { label: 'Condo', value: 'condo' },
            { label: 'Other', value: 'other' },
          ]}
        />
        <Select
          label="Region"
          placeholder="Any"
          value={region}
          setValue={setRegion}
          options={[{ label: 'Any', value: '' }]}
        />
        <Select
          label="Floor Count"
          placeholder="Any"
          value={floorCount}
          setValue={setFloorCount}
          options={[
            { label: 'Any', value: '' },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
          ]}
        />
        <div className={classes.buttonContainer}>
          <Button onClick={() => setSearchKey(Math.random())}>SEARCH</Button>
        </div>
      </div>
    </div>
  );
}
