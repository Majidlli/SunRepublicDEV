import React from 'react';

import Button from '../Button';
import Select from '../Select';
import TextInput from '../TextInput';
import { t } from '../../i18n';
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
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,
  hasPool,
  setHasPool,
  type,
  setType,
  region,
  setRegion,
  floorCount,
  setFloorCount,
  setSearchKey,
}) {
  /* const [maxPriceOptions, setMaxPriceOptions] = useState([
    50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000,
    500000,
  ]); */

  /* useEffect(() => {
    const prices = [
      50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000,
      500000,
    ];

    const maxPrices = [];

    prices.forEach((price) => {
      if (price >= minPrice) {
        maxPrices.push({ label: `£${price}`, value: price });
      }
    });

    setMaxPriceOptions(maxPrices);
  }, [minPrice]); */

  /* useEffect(() => {
    if (minPrice > maxPrice) {
      setMaxPrice('');
    }
  }, [maxPrice, minPrice, setMaxPrice]); */

  const changeNumberInputValue = (value, setter) => {
    const re = /^[0-9\b]+$/;

    if (value === '' || re.test(value)) {
      setter(value);
    }
  };

  return (
    <div className={classes.Filters} ref={filtersRef}>
      <div className={classes.col}>
        <Select
          label={t('Bedrooms')}
          placeholder={t('Any')}
          value={bedrooms}
          setValue={setBedrooms}
          options={[
            { label: t('Any'), value: '' },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
          ]}
        />
        <Select
          label={t('Bathrooms')}
          placeholder={t('Any')}
          value={bathrooms}
          setValue={setBathrooms}
          options={[
            { label: t('Any'), value: '' },
            { label: 1, value: 1 },
            { label: 2, value: 2 },
            { label: 3, value: 3 },
            { label: 4, value: 4 },
            { label: 5, value: 5 },
          ]}
        />
        <div className={classes.shortSelects}>
          <TextInput
            label="Price"
            placeholder="From"
            value={minPrice}
            onChange={(event) =>
              changeNumberInputValue(event.target.value, setMinPrice)
            }
          />
          <TextInput
            placeholder="To"
            label="&nbsp;"
            value={maxPrice}
            onChange={(event) =>
              changeNumberInputValue(event.target.value, setMaxPrice)
            }
          />
          {/* <Select
            label={t('Price')}
            placeholder={t('From')}
            value={minPrice}
            setValue={setMinPrice}
            options={[
              { label: '£50000', value: 50000 },
              { label: '£100000', value: 100000 },
              { label: '£150000', value: 150000 },
              { label: '£200000', value: 200000 },
              { label: '£250000', value: 250000 },
              { label: '£300000', value: 300000 },
              { label: '£350000', value: 350000 },
              { label: '£400000', value: 400000 },
              { label: '£450000', value: 450000 },
              { label: '£500000', value: 500000 },
            ]}
          />
          <Select
            label="&nbsp;"
            placeholder={t('To')}
            value={maxPrice}
            setValue={setMaxPrice}
            options={maxPriceOptions}
          /> */}
        </div>
      </div>
      <div className={classes.col}>
        <div className={classes.shortSelects}>
          {/*    <Select
            label={t('Square Meter')}
            placeholder={t('Any')}
            value={area}
            setValue={setArea}
            options={[
              { label: t('Any'), value: '' },
              { label: 500, value: 500 },
            ]}
          /> */}
          <TextInput
            label="Square Meter"
            placeholder="From"
            value={minArea}
            onChange={(event) =>
              changeNumberInputValue(event.target.value, setMinArea)
            }
          />
          <TextInput
            placeholder="To"
            label="&nbsp;"
            value={maxArea}
            onChange={(event) =>
              changeNumberInputValue(event.target.value, setMaxArea)
            }
          />
        </div>
        <Select
          label={t('Pool')}
          placeholder={t('All')}
          value={hasPool}
          setValue={setHasPool}
          options={[
            { label: t('All'), value: '' },
            { label: t('Pool present'), value: true },
            { label: t('No Pool'), value: false },
          ]}
        />
      </div>
      <div className={classes.col}>
        <Select
          label={t('Type')}
          placeholder={t('Any')}
          value={type}
          setValue={setType}
          options={[
            { label: t('Any'), value: '' },
            { label: t('Single Family'), value: 'single family' },
            { label: t('Townhouse'), value: 'townhouse' },
            { label: t('Condo'), value: 'condo' },
            { label: t('Other'), value: 'other' },
          ]}
        />
        <Select
          label={t('Region')}
          placeholder={t('Any')}
          value={region}
          setValue={setRegion}
          options={[
            { label: t('Any'), value: '' },
            { label: t('Kyrenia'), value: 'kyrenia' },
            { label: t('Nicosia'), value: 'nicosia' },
            { label: t('Famagusta'), value: 'famagusta' },
            { label: t('Iskele'), value: 'iskele' },
          ]}
        />
        <Select
          label={t('Floor Count')}
          placeholder={t('Any')}
          value={floorCount}
          setValue={setFloorCount}
          options={[
            { label: t('Any'), value: '' },
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
