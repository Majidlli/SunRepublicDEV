/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';

import axios from 'axios';

import Button from '../../components/Button';
import { API_URL } from '../../constants/main';
import classes from './styles.module.scss';

export default function AddPropertyPage() {
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [title, setTitle] = useState('');
  const [titleRus, setTitleRus] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionRus, setDescriptionRus] = useState('');
  const [images, setImages] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [squareFeet, setSquareFeet] = useState('');
  const [buildingAge, setBuildingAge] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [plotArea, setPlotArea] = useState('');
  const [hasPool, setHasPool] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const [buildingType, setBuildingType] = useState('');
  const [region, setRegion] = useState('');
  const [floorCount, setFloorCount] = useState('');
  const [distanceToLarnaca, setDistanceToLarnaca] = useState('');
  const [distanceToErcan, setDistanceToErcan] = useState('');
  const [market, setMarket] = useState('');
  const [hospital, setHospital] = useState('');

  const formRef = useRef();

  const validatePassword = async () => {
    try {
      const response = await axios.post(`${API_URL}/admin/password`, {
        password,
      });

      if (response.data.isValid) {
        setIsPasswordValid(true);
      } else {
        alert('WRONG PASSWORD');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createProperty = async () => {
    try {
      const form = new FormData();
      Array.from(images).forEach((image) => form.append('file', image));
      form.append('title', title);
      form.append('titleRus', titleRus);
      form.append('description', description);
      form.append('descriptionRus', descriptionRus);
      form.append('bedrooms', bedrooms);
      form.append('squareFeet', squareFeet);
      form.append('buildingAge', buildingAge);
      form.append('bathrooms', bathrooms);
      form.append('plotArea', plotArea);
      form.append('swimmingPool', hasPool);
      form.append('furniture', furniture);
      form.append('buildingType', buildingType);
      form.append('region', region);
      form.append('floorCount', floorCount);
      form.append('distanceToLarnaca', distanceToLarnaca);
      form.append('distanceToErcan', distanceToErcan);
      form.append('market', market);
      form.append('hospital', hospital);

      await axios.post(`${API_URL}/property`, form, {
        headers: {
          password,
        },
      });

      setTitle('');
      setTitleRus('');
      setDescription('');
      setDescriptionRus('');
      setImages('');
      setBedrooms('');
      setSquareFeet('');
      setBuildingAge('');
      setBathrooms('');
      setPlotArea('');
      setHasPool(false);
      setFurniture(false);
      setBuildingType('');
      setRegion('');
      setFloorCount('');
      setDistanceToLarnaca('');
      setDistanceToErcan('');
      setMarket('');
      setHospital('');

      formRef.current.reset();

      alert('SUCCESS');
    } catch (error) {
      console.log(error);
      alert('ERROR');
    }
  };

  if (!isPasswordValid) {
    return (
      <div className={classes.AddPropertyPage}>
        <div className={classes.container}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              validatePassword();
            }}
          >
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <Button onClick={validatePassword}>Proceed</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.AddPropertyPage}>
      <div className={classes.container}>
        <h1>Add Property</h1>
        <form ref={formRef}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label>
            Title (russian)
            <input
              type="text"
              value={titleRus}
              onChange={(event) => setTitleRus(event.target.value)}
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
            Square Feet
            <input
              type="number"
              value={squareFeet}
              onChange={(event) => setSquareFeet(event.target.value)}
            />
          </label>
          <label>
            Building age
            <input
              type="number"
              value={buildingAge}
              onChange={(event) => setBuildingAge(event.target.value)}
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
            Plot area
            <input
              type="number"
              value={plotArea}
              onChange={(event) => setPlotArea(event.target.value)}
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
            Swimming Pool
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
            Furniture
            <input
              type="radio"
              value="Yes"
              name="furniture"
              onChange={() => setFurniture(true)}
              checked={furniture}
            />
            Yes
            <input
              type="radio"
              value="No"
              name="furniture"
              onChange={() => setFurniture(false)}
              checked={!furniture}
            />
            No
          </label>
          <label>
            Building Type
            <select
              value={buildingType}
              onChange={(event) => setBuildingType(event.target.value)}
            >
              <option value="Studio">Studio</option>
              <option value="One bedroom">One bedroom</option>
              <option value="Two bedrooms">Two bedrooms</option>
              <option value="Three bedrooms">Three bedrooms</option>
              <option value="Four bedrooms">Four bedrooms</option>
              <option value="Villa">Villa</option>
              <option value="Bungalow Townhouse">Bungalow Townhouse</option>
            </select>
          </label>
          <label>
            Region
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
            >
              <option value="Girne">Girne</option>
              <option value="Famagusta">Famagusta</option>
              <option value="Nicosia">Nicosia</option>
              <option value="İskele">İskele</option>
            </select>
          </label>
          <label>
            Distance to LARNACA
            <input
              type="number"
              value={distanceToLarnaca}
              onChange={(event) => setDistanceToLarnaca(event.target.value)}
            />
          </label>
          <label>
            Distance to ERCAN
            <input
              type="number"
              value={distanceToErcan}
              onChange={(event) => setDistanceToErcan(event.target.value)}
            />
          </label>
          <label>
            Market
            <input
              type="string"
              value={market}
              onChange={(event) => setMarket(event.target.value)}
            />
          </label>
          <label>
            Hospital
            <input
              type="string"
              value={hospital}
              onChange={(event) => setHospital(event.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <label>
            Description (russian)
            <textarea
              value={descriptionRus}
              onChange={(event) => setDescriptionRus(event.target.value)}
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
