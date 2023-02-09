/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';

import { useMediaQuery } from 'react-responsive';
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import MultiClamp from 'react-multi-clamp';

import i18n, { t } from '../../i18n';
import Modal from '../../components/Modal/Modal';
import ImageGallery from '../../components/ImageGallery';
import PropertyList from '../../components/PropertyList';
import Button from '../../components/Button';
import PropertyService from '../../services/PropertyService';
import { STATIC_URL } from '../../constants/main';
import instagramIcon from '../../assets/images/instagram.svg';
import facebookIcon from '../../assets/images/facebook.svg';
import youtubeIcon from '../../assets/images/youtube.png';
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
import featuresCheckIcon from '../../assets/images/icons/checked.svg';
import featuresNonCheckIcon from '../../assets/images/icons/nonChecked.svg';
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
  const [isShowModal, setIsShowModal] = useState(false);

  const handleShowModal = () => {
    setIsShowModal(!isShowModal);
  };

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
    setGalleryImages(data?.Images?.slice(1));
    setTitleImage(data?.Images?.[0]);
  }, [data]);

  let title = data?.title;
  let description = data?.description;

  const changeTitleImage = (image) => {
    setTitleImage(image);
    setGalleryImages(data?.Images?.filter((img) => img.id !== image.id));
  };

  const addEnter = (text) => {
    if (text === undefined) return text;
    return text.split('\n').map((str) => (
      <p key={nanoid()} style={{ margin: 0 }}>
        {str}
      </p>
    ));
  };

  if (i18n.language === 'en') {
    title = data?.title || data?.titleRus;
    description = data?.description || data?.descriptionRus;
  } else if (i18n.language === 'ru') {
    title = data?.titleRus || data?.title;
    description = data?.descriptionRus || data?.description;
  }

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
            <div className={classes.description}>{addEnter(description)}</div>
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
                <button
                  type="button"
                  onClick={handleShowModal}
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
                </button>
              </div>
            </div>
            <div
              className={classes.specs}
              style={{
                flexFlow: isTabletOrMobile ? 'row wrap' : 'inherit',
                gap: isTabletOrMobile ? '0px' : '10px',
                justifyContent: 'center',
              }}
            >
              <div
                className={classes.col}
                style={{ marginBottom: isTabletOrMobile ? '10px' : '0px' }}
              >
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
                          {t('squareMeter')}
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
                  <li
                    style={{
                      textTransform: 'none',
                    }}
                  >
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
              <div
                className={classes.col}
                style={{ marginBottom: isTabletOrMobile ? '10px' : '0px' }}
              >
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
                  <li
                    style={{
                      textTransform: 'none',
                      marginBottom: isTabletOrMobile ? '10px' : '0px',
                    }}
                  >
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
                          {t('buildingType')}
                        </p>
                        <p className={classes.propertyContainerText}>
                          {data?.buildingType}
                        </p>
                      </div>
                    </div>
                  </li>
                  {data?.floorCount !== 0 && (
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
                  )}
                </ul>
              </div>
            </div>
            {/* FEATURES */}
            <div className={classes.description}>{addEnter(description)}</div>
            <h1
              style={{
                borderTop: '1px solid black',
                display: 'block',
                padding: '20px 0px',
              }}
            >
              {t('Features')}
            </h1>
            <div
              className={classes.specs}
              style={{
                flexFlow: isTabletOrMobile ? 'row wrap' : 'inherit',
                gap: isTabletOrMobile ? '0px' : '10px',
                justifyContent: 'center',
              }}
            >
              <div className={classes.col}>
                <ul>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.featuresContainer}>
                      {features.barbecue ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Barbecue')}
                      </p>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.featuresContainer}>
                      {features.carPark ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Carpark')}
                      </p>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.featuresContainer}>
                      {features.garage ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Garage')}
                      </p>
                    </div>
                  </li>
                  <li
                    style={{
                      textTransform: 'none',
                      marginBottom: isTabletOrMobile ? '10px' : '0px',
                    }}
                  >
                    <div className={classes.featuresContainer}>
                      {features.whiteGoods ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
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
                      {features.publicPool ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Publicpool')}
                      </p>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.featuresContainer}>
                      {features.elevator ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Elevator')}
                      </p>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.featuresContainer}>
                      {features.garden ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Garden')}
                      </p>
                    </div>
                  </li>
                  <li
                    style={{
                      textTransform: 'none',
                      marginBottom: isTabletOrMobile ? '10px' : '0px',
                    }}
                  >
                    <div className={classes.featuresContainer}>
                      {features.firePlace ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
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
                      {features.generator ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Generator')}
                      </p>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.featuresContainer}>
                      {features.roofTerrace ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Roofterrace')}
                      </p>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.featuresContainer}>
                      {features.airConditioner ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
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
                      {features.loft ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Loft')}
                      </p>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.featuresContainer}>
                      {features.balcony ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Balcony')}
                      </p>
                    </div>
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    <div className={classes.featuresContainer}>
                      {features.furniture ? (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresCheckIcon}
                          alt="featuresCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      ) : (
                        <img
                          className={classes.propertyContainerIcon}
                          src={featuresNonCheckIcon}
                          alt="featuresNonCheckIcon"
                          width={25}
                          height={25}
                          style={{ marginRight: '5px' }}
                        />
                      )}
                      <p className={classes.featuresContainerText}>
                        {t('Furniture')}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
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
        {isShowModal && (
          <Modal hideModal={handleShowModal}>
            <div className={classes.modal}>
              <h1 className={classes.title}>Social Platform</h1>
              <div className={classes.social}>
                <a
                  href="https://www.instagram.com/sunrepublic.vip/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={instagramIcon} alt="Instagram" />
                </a>
                <a
                  href="https://www.facebook.com/sunrepublic.vip/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={facebookIcon} alt="Facebook" />
                </a>
                <a
                  href="https://wa.me/905338457788"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={whatsAppIcon} alt="WhatsApp" />
                </a>
                <a
                  href="https://www.youtube.com/c/IrinDrealty"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={youtubeIcon} alt="YouTube" />
                </a>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}
