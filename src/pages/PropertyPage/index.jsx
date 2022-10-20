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
import whatsAppIcon from '../../assets/images/whatsapp.svg';
import classes from './styles.module.scss';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

export default function PropertyPage() {
  const [titleImage, setTitleImage] = useState({});
  const [galleryImages, setGalleryImages] = useState([]);

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
                $ {formatter.format(data?.price).replace('$', '')}
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
                <Button
                  onClick={() => {
                    navigate('/contact-us');
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: 'smooth',
                    });
                  }}
                  style={{
                    width: isTabletOrMobile ? 112 : '',
                  }}
                >
                  {t('CONTACT US')}
                </Button>
                <a
                  href="https://wa.me/905338457788"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={whatsAppIcon} alt="WhatsApp" />
                </a>
              </div>
            </div>
            <div className={classes.specs}>
              <div className={classes.col}>
                <ul>
                  <li>
                    {t('Bedrooms')}: {data?.bedrooms}
                  </li>
                  <li>
                    {t('Bathrooms')}: {data?.bathrooms}
                  </li>
                  <li>
                    {t('Pool')}: {data?.hasPool === true ? t('Yes') : t('No')}
                  </li>
                </ul>
              </div>
              <div className={classes.col}>
                <ul>
                  <li>
                    {t('Region')}: {data?.region}
                  </li>
                  <li style={{ textTransform: 'none' }}>
                    {t('Square Feet')}: {data?.area}ft<sup>2</sup>
                  </li>
                  <li>
                    {t('Type')}:{' '}
                    {t(
                      data?.type?.charAt(0)?.toUpperCase() +
                        data?.type?.slice(1)
                    )}
                  </li>
                  <li>
                    {t('Floor Count')}: {data?.floorCount}
                  </li>
                </ul>
              </div>
            </div>
            {!isTabletOrMobile && (
              <div className={classes.description}>{description}</div>
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
