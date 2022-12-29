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
  const [action, setAction] = useState('rent');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState({
    barbecue: false,
    carPark: false,
    garage: false,
    publicPool: false,
    elevator: false,
    garden: false,
    generator: false,
    roofTerrace: false,
    loft: false,
    balcony: false,
    airConditioner: false,
    furniture: false,
    whiteGoods: false,
    firePlace: false,
  });

  const changeFeatures = (value) => {
    setFeatures({ ...features, ...value });
  };

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
      form.append('action', action);
      form.append('price', price);
      form.append('features', JSON.stringify(features));

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
      setAction('rent');
      setPrice('');
      setFeatures({
        barbecue: false,
        carPark: false,
        garage: false,
        publicPool: false,
        elevator: false,
        garden: false,
        generator: false,
        roofTerrace: false,
        loft: false,
        balcony: false,
        airConditioner: false,
        furniture: false,
        whiteGoods: false,
        firePlace: false,
      });

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
            Action
            <input
              type="radio"
              value="rent"
              name="action"
              onChange={() => setAction('rent')}
              checked={action === 'rent'}
            />
            Rent
            <input
              type="radio"
              value="sell"
              name="action"
              onChange={() => setAction('sell')}
              checked={action === 'sell'}
            />
            Sell
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
            Barbecue
            <input
              type="checkbox"
              checked={features.barbecue}
              onChange={() => changeFeatures({ barbecue: !features.barbecue })}
            />
          </label>
          <label>
            Car Park
            <input
              type="checkbox"
              checked={features.carPark}
              onChange={() => changeFeatures({ carPark: !features.carPark })}
            />
          </label>
          <label>
            Garage
            <input
              type="checkbox"
              checked={features.garage}
              onChange={() => changeFeatures({ garage: !features.garage })}
            />
          </label>
          <label>
            Public Pool
            <input
              type="checkbox"
              checked={features.publicPool}
              onChange={() =>
                changeFeatures({ publicPool: !features.publicPool })
              }
            />
          </label>
          <label>
            Elevator
            <input
              type="checkbox"
              checked={features.elevator}
              onChange={() => changeFeatures({ elevator: !features.elevator })}
            />
          </label>
          <label>
            Garden
            <input
              type="checkbox"
              checked={features.garden}
              onChange={() => changeFeatures({ garden: !features.garden })}
            />
          </label>
          <label>
            Generator
            <input
              type="checkbox"
              checked={features.generator}
              onChange={() =>
                changeFeatures({ generator: !features.generator })
              }
            />
          </label>
          <label>
            Roof Terrace
            <input
              type="checkbox"
              checked={features.roofTerrace}
              onChange={() =>
                changeFeatures({ roofTerrace: !features.roofTerrace })
              }
            />
          </label>
          <label>
            Loft
            <input
              type="checkbox"
              checked={features.loft}
              onChange={() => changeFeatures({ loft: !features.loft })}
            />
          </label>
          <label>
            Balcony
            <input
              type="checkbox"
              checked={features.balcony}
              onChange={() => changeFeatures({ balcony: !features.balcony })}
            />
          </label>
          <label>
            Air Conditioner
            <input
              type="checkbox"
              checked={features.airConditioner}
              onChange={() =>
                changeFeatures({ airConditioner: !features.airConditioner })
              }
            />
          </label>
          <label>
            Furniture
            <input
              type="checkbox"
              checked={features.furniture}
              onChange={() =>
                changeFeatures({ furniture: !features.furniture })
              }
            />
          </label>
          <label>
            White Goods
            <input
              type="checkbox"
              checked={features.whiteGoods}
              onChange={() =>
                changeFeatures({ whiteGoods: !features.whiteGoods })
              }
            />
          </label>
          <label>
            Fire Place
            <input
              type="checkbox"
              checked={features.firePlace}
              onChange={() =>
                changeFeatures({ firePlace: !features.firePlace })
              }
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
