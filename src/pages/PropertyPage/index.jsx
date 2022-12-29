/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useRef } from 'react';

import { useMediaQuery } from 'react-responsive';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import MultiClamp from 'react-multi-clamp';

import i18n, { t } from '../../i18n';
import ImageGallery from '../../components/ImageGallery';
import PropertyList from '../../components/PropertyList';
import Button from '../../components/Button';
import PropertyService from '../../services/PropertyService';
import { STATIC_URL } from '../../constants/main';
import bathroomIcon from '../../assets/images/icons/bathroom.svg';
import bedroomIcon from '../../assets/images/icons/bedroom.svg';
import buildingageIcon from '../../assets/images/icons/buildingage.svg';
import squareFeetIcon from '../../assets/images/icons/square-feet.svg';
import swimmingPoolIcon from '../../assets/images/icons/swimming-pool-2.svg';
import plotIcon from '../../assets/images/icons/plot.svg';
import furnitureIcon from '../../assets/images/icons/furniture.svg';
import typesIcon from '../../assets/images/icons/types.svg';
import locationIcon from '../../assets/images/icons/location.svg';
import floorIcon from '../../assets/images/icons/floor.svg';
import shareIcon from '../../assets/images/icons/share.svg';
import whatsAppIcon from '../../assets/images/whatsapp.svg';
import featuresCheckIcon from '../../assets/images/icons/featurescheck.svg';
// import cityIcon from '../../assets/images/icons/city.svg';
// import airportIcon from '../../assets/images/icons/airport.svg';
// import marketIcon from '../../assets/images/icons/market.svg';
import classes from './styles.module.scss';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',
  minimumFractionDigits: 0,
});

export default function PropertyPage() {
  const [titleImage, setTitleImage] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);
  const [features, setFeatures] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const { data } = useQuery(
    ['singleProperty', id],
    () => PropertyService.getSingleProperty(id),
    {
      staleTime: Infinity,
    }
  );

  const { data: similarProperty } = useQuery(
    'recentProperty',
    () => PropertyService.getPropertyList(),
    {
      enabled: !!isTabletOrMobile,
    }
  );

  const containerRef = useRef();
  const galleryContainerRef = useRef();

  useEffect(() => {
    galleryContainerRef.current.style.width = 'unset';
  }, []);

  useEffect(() => {
    if (data?.features) setFeatures(JSON.parse(data?.features));
    // console.log(data?.features);
    // setFeatures(JSON.parse(data?.features));
    setGalleryImages(data?.Images?.slice(1));
    setTitleImage(data?.Images?.[0]);
  }, [data]);

  let title = data?.title;
  let description = data?.description;

  const changeTitleImage = (image) => {
    setTitleImage(image);
    setGalleryImages(data?.Images?.filter((img) => img.id !== image.id));
  };

  if (i18n.language === 'en') {
    title = data?.title || data?.titleRus;
    description = data?.description || data?.descriptionRus;
  } else if (i18n.language === 'ru') {
    title = data?.titleRus || data?.title;
    description = data?.descriptionRus || data?.description;
  }
  console.log(features);
  return (
    <>
      {isTabletOrMobile ? (
        <div
          className={classes['header-background']}
          style={{ height: '47px' }}
        />
      ) : (
        <div
          className={classes['header-background']}
          style={{ height: '114px' }}
        />
      )}
      <div className={classes.PropertyPage}>
        <div className={classes.container} ref={containerRef}>
          <div className={classes.galleryContainer} ref={galleryContainerRef}>
            {isTabletOrMobile ? (
              <img
                alt="Property"
                src={STATIC_URL + titleImage?.path}
                className={classes.titleImage}
              />
            ) : (
              <ImageGallery images={data?.Images?.map((image) => image.path)} />
            )}
          </div>
          {isTabletOrMobile && (
            <div className={classes.description}>{description}123</div>
          )}
          {isTabletOrMobile && (
            <div className={classes.restImages}>
              {galleryImages?.map((image) => {
                return (
                  <img
                    key={image.id}
                    src={STATIC_URL + image.path}
                    alt="Property"
                    onClick={() => changeTitleImage(image)}
                  />
                );
              })}
            </div>
          )}
          <div className={classes.mainData}>
            <header>
              <h1>{title}</h1>
              <span className={classes.price}>
                £ {formatter.format(data?.price).replace('£', '')}
              </span>
            </header>
            <div className={classes.buttons}>
              <Button
                style={{
                  width: isTabletOrMobile ? 100 : 126,
                  backgroundColor: 'black',
                  borderRadius: 6,
                }}
              >
                {data?.action === 'sell' ? t('FOR SALE') : t('FOR RENT')}
              </Button>
              <div className={classes.contactButtons}>
                <a
                  href="https://wa.me/905338457788"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.contactButton}
                >
                  <img
                    width={40}
                    height={40}
                    src={whatsAppIcon}
                    alt="whatsAppIcon"
                    style={{ marginRight: '10px' }}
                  />
                  {t('Contact')}
                </a>
                <a
                  href="https://wa.me/905338457788"
                  target="_blank"
                  rel="noreferrer"
                  className={classes.shareButton}
                >
                  <img
                    style={{ marginRight: '10px' }}
                    width={20}
                    height={20}
                    src={shareIcon}
                    alt="shareIcon"
                  />
                  {t('Share')}
                </a>
              </div>
            </div>
            <div className={classes.specs}>
              <div className={classes.col}>
                <ul>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={squareFeetIcon}
                        alt="squareFeetIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('SquareFeet')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.squareFeet}m<sup>2</sup>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={bedroomIcon}
                        alt="bedroomIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('Bedrooms')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.bedrooms}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={bathroomIcon}
                        alt="bathroomIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('Bathrooms')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.bathrooms}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={classes.col}>
                <ul>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={buildingageIcon}
                        alt="buildingageIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('BuildingAge')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.buildingAge}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={plotIcon}
                        alt="plotIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('plotArea')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.plotArea}m<sup>2</sup>
                        </p>
                      </div>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={swimmingPoolIcon}
                        alt="swimmingPoolIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('SwimmingPool')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.swimmingPool === true ? t('Yes') : t('No')}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={classes.col}>
                <ul>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={locationIcon}
                        alt="locationIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('Region')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.region}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={furnitureIcon}
                        alt="furnitureIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('Furniture')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.furniture ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className={classes.col}>
                <ul>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={typesIcon}
                        alt="typesIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('biuldingType')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.buildingType}
                        </p>
                      </div>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.propertyContainer}>
                      <img
                        className={classes.propertyContainerIcon}
                        src={floorIcon}
                        alt="floorIcon"
                        width={60}
                        height={60}
                      />
                      <div className={classes.propertyContainerDescription}>
                        <p className={classes.propertyContainerTextTitle}>
                          {t('Floors')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.floorCount}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {!isTabletOrMobile && (
              <>
                <div className={classes.description}>{description}</div>
                <h1
                  style={{
                    borderTop: '1px solid black',
                    display: 'block',
                    padding: '20px 0px',
                  }}
                >
                  {t('Features')}
                </h1>
                <div className={classes.specs}>
                  <div className={classes.col}>
                    <ul>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Barbecue')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Carpark')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Garage')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Whitegoods')}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className={classes.col}>
                    <ul>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Publicpool')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Elevator')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Garden')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Fireplace')}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className={classes.col}>
                    <ul>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Generator')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Roofterrace')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Airconditioner')}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className={classes.col}>
                    <ul>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Loft')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Balcony')}
                          </p>
                        </div>
                      </li>
                      <li style={{ textTransform: 'none' }}>
                        <div className={classes.featuresContainer}>
                          <img
                            className={classes.propertyContainerIcon}
                            src={featuresCheckIcon}
                            alt="featuresCheckIcon"
                            width={25}
                            height={25}
                            style={{ marginRight: '5px' }}
                          />
                          <p className={classes.featuresContainerText}>
                            {t('Furniture')}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={classes.similarQueries}>
        <h2>{t('Similar queries')}</h2>
      </div>
      <div className={classes.propertyListContainer}>
        {data && (
          <>
            {isTabletOrMobile ? (
              <div className={classes.similarPropertyContainer}>
                {similarProperty &&
                  similarProperty?.rows?.slice(0, 3)?.map((prop) => {
                    if (window.location.pathname.split('/')[2] === prop.id)
                      return false;
                    return (
                      <div key={prop.id} className={classes.similarProp}>
                        <header>
                          <img
                            src={STATIC_URL + prop?.Images?.[0]?.path}
                            alt="Property"
                          />
                          <button
                            type="button"
                            onClick={() => navigate(`/property/${prop.id}`)}
                          >
                            {t('DETAILS')}
                          </button>
                        </header>
                        <h1>{prop.title}</h1>
                        <MultiClamp
                          clamp={3}
                          className={classes.similarPropDescription}
                        >
                          {prop.description}
                        </MultiClamp>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <PropertyList
                filtersRef={containerRef}
                queryName="recentRentProperty"
                action={data?.action}
                recent
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
