/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';

import axios from 'axios';

import Button from '../../components/Button';
import { API_URL } from '../../constants/main';
import classes from './styles.module.scss';

export default function AddPropertyPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [hasPool, setHasPool] = useState(false);
  const [hasHOAFee, setHasHOAFee] = useState(false);
  const [type, setType] = useState('');
  const [region, setRegion] = useState('');
  const [floorCount, setFloorCount] = useState('');
  const [action, setAction] = useState('sell');

  const createProperty = async () => {
    try {
      const form = new FormData();
      Array.from(images).forEach((image) => form.append('file', image));
      form.append('title', title);
      form.append('description', description);
      form.append('bedrooms', bedrooms);
      form.append('bathrooms', bathrooms);
      form.append('price', price);
      form.append('area', area);
      form.append('hasPool', hasPool);
      form.append('hasHOAFee', hasHOAFee);
      form.append('type', type);
      form.append('region', region);
      form.append('floorCount', floorCount);
      form.append('action', action);

      await axios.post(`${API_URL}/property`, form);

      alert('SUCCESS');
    } catch (error) {
      console.log(error);
      alert('ERROR');
    }
  };

  return (
    <div className={classes.AddPropertyPage}>
      <div className={classes.container}>
        <h1>Add Property</h1>
        <form>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label>
            Bedrooms
            <input
              type="number"
              value={bedrooms}
              onChange={(event) => setBedrooms(event.target.value)}
            />
          </label>
          <label>
            Bathrooms
            <input
              type="number"
              value={bathrooms}
              onChange={(event) => setBathrooms(event.target.value)}
            />
          </label>
          <label>
            Price
            <input
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </label>
          <label>
            Area
            <input
              type="number"
              value={area}
              onChange={(event) => setArea(event.target.value)}
            />
          </label>
          <label>
            Has pool
            <input
              type="radio"
              value="Yes"
              name="hasPool"
              onChange={() => setHasPool(true)}
              checked={hasPool}
            />
            Yes
            <input
              type="radio"
              value="No"
              name="hasPool"
              onChange={() => setHasPool(false)}
              checked={!hasPool}
            />
            No
          </label>
          <label>
            Has HOA Fee
            <input
              type="radio"
              value="Yes"
              name="hasHOAFee"
              onChange={() => setHasHOAFee(true)}
              checked={hasHOAFee}
            />
            Yes
            <input
              type="radio"
              value="No"
              name="hasHOAFee"
              onChange={() => setHasHOAFee(false)}
              checked={!hasHOAFee}
            />
            No
          </label>
          <label>
            Type
            <input
              type="text"
              value={type}
              onChange={(event) => setType(event.target.value)}
            />
          </label>
          <label>
            Region
            <input
              type="text"
              value={region}
              onChange={(event) => setRegion(event.target.value)}
            />
          </label>
          <label>
            Floors
            <input
              type="number"
              value={floorCount}
              onChange={(event) => setFloorCount(event.target.value)}
            />
          </label>
          <label>
            Action
            <input
              type="radio"
              value="Rent"
              name="action"
              checked={action === 'rent'}
              onChange={() => setAction('rent')}
            />
            Rent
            <input
              type="radio"
              value="Sell"
              name="action"
              checked={action === 'sell'}
              onChange={() => setAction('sell')}
            />
            Sell
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <label>
            Images
            <input
              onChange={(event) => setImages(event.target.files)}
              type="file"
              accept="image/png, image/gif, image/jpeg"
              multiple
            />
          </label>
        </form>
        <Button onClick={createProperty}>Submit</Button>
      </div>
    </div>
  );
}
