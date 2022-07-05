import React, { useEffect, useRef } from 'react';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import ImageGallery from '../../components/ImageGallery';
import PropertyList from '../../components/PropertyList';
import Button from '../../components/Button';
import PropertyService from '../../services/PropertyService';
import classes from './styles.module.scss';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export default function PropertyPage() {
  const { id } = useParams();

  const { data } = useQuery(
    ['singleProperty', id],
    () => PropertyService.getSingleProperty(id),
    {
      staleTime: Infinity,
    }
  );

  const containerRef = useRef();
  const galleryContainerRef = useRef();

  useEffect(() => {
    galleryContainerRef.current.style.width = 'unset';
  }, []);

  return (
    <>
      <div className={classes.PropertyPage}>
        <div className={classes.container} ref={containerRef}>
          <div className={classes.galleryContainer} ref={galleryContainerRef}>
            <ImageGallery images={data?.Images?.map((image) => image.path)} />
          </div>
          <div className={classes.mainData}>
            <header>
              <h1>{data?.title}</h1>
              <span className={classes.price}>
                $ {formatter.format(data?.price).replace('$', '')}
              </span>
            </header>
            <div className={classes.buttons}>
              <Button
                style={{
                  width: 126,
                  backgroundColor: 'black',
                  borderRadius: 6,
                }}
              >
                FOR {data?.action === 'sell' ? 'SALE' : 'RENT'}
              </Button>
              <Button>CONTACT US</Button>
            </div>
            <div className={classes.specs}>
              <div className={classes.col}>
                <ul>
                  <li>Bedrooms: {data?.bedrooms}</li>
                  <li>Bathrooms: {data?.bathrooms}</li>
                  <li>Pool: {data?.hasPool === true ? 'Yes' : 'No'}</li>
                  <li>HOA Fee: {data?.hasHOAFee === true ? 'Yes' : 'No'}</li>
                  <li>Type: {data?.type}</li>
                  <li>Floor Count: {data?.floorCount}</li>
                </ul>
              </div>
              <div className={classes.col}>
                <ul>
                  <li>Region: {data?.region}</li>
                  <li style={{ textTransform: 'none' }}>
                    Square Feet: {data?.area}ft<sup>2</sup>
                  </li>
                </ul>
              </div>
            </div>
            <div className={classes.description}>{data?.description}</div>
          </div>
        </div>
      </div>
      <div className={classes.similarQueries}>
        <h2>Similar queries</h2>
      </div>
      <div className={classes.propertyListContainer}>
        {data && (
          <PropertyList
            filtersRef={containerRef}
            queryName="recentRentProperty"
            action={data?.action}
            recent
          />
        )}
      </div>
    </>
  );
}
