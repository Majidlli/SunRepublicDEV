import React, { useEffect, useRef } from 'react';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import i18n, { t } from '../../i18n';
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

  let title = data?.title;
  let description = data?.description;

  if (i18n.language === 'en') {
    title = data?.title || data?.titleRus;
    description = data?.description || data?.descriptionRus;
  } else if (i18n.language === 'ru') {
    title = data?.titleRus || data?.title;
    description = data?.descriptionRus || data?.description;
  }

  return (
    <>
      <div className={classes.PropertyPage}>
        <div className={classes.container} ref={containerRef}>
          <div className={classes.galleryContainer} ref={galleryContainerRef}>
            <ImageGallery images={data?.Images?.map((image) => image.path)} />
          </div>
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
                  width: 126,
                  backgroundColor: 'black',
                  borderRadius: 6,
                }}
              >
                {data?.action === 'sell' ? t('FOR SALE') : t('FOR RENT')}
              </Button>
              <Button>{t('CONTACT US')}</Button>
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
                  <li>
                    {t('HOA Fee')}:{' '}
                    {data?.hasHOAFee === true ? t('Yes') : t('No')}
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
            <div className={classes.description}>{description}</div>
          </div>
        </div>
      </div>
      <div className={classes.similarQueries}>
        <h2>{t('Similar queries')}</h2>
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
