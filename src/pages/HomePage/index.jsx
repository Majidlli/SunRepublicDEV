/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useContext } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { UIContext } from '../../context';
import { t } from '../../i18n';
// import SearchResults from '../../components/SearchResults';
import PropetyCarousel from '../../components/PropertyCarousel';
import Button from '../../components/Button';
// import Map from '../../components/Map';
import presentationVideo from '../../assets/videos/presentation.mp4';
import classes from './styles.module.scss';

export default function HomePage() {
  const { searchTerm } = useContext(UIContext);

  const containerRef = useRef();

  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('search');

  const navigate = useNavigate();

  return (
    <div className={classes.HomePage}>
      <div className={classes.searchContainer}>
        <div className={classes.container} ref={containerRef}>
          <h1 style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            {t('Buy with')} <span>Sun</span>
          </h1>
          <div className={classes.text}>
            <div className={classes.background} />
            <p className={classes.hidden}>{t('homePageHeaderText')}</p>
            <p className={classes.visible}>{t('homePageHeaderText')}</p>
          </div>
        </div>
      </div>
      <div className={classes.info}>
        <div className={classes.reasons}>
          <h2>{t('Reasons To Choose Us')}</h2>
          <ul>
            <li>
              <div className={classes.first} />
              {t('aboutReason1')}
            </li>
            <li>
              <div className={classes.second} />
              {t('aboutReason2')}
            </li>
            <li>
              <div className={classes.third} />
              {t('aboutReason3')}
            </li>
            <li>
              <div className={classes.fourth} />
              {t('aboutReason4')}
            </li>
            <li>
              <div className={classes.fifth} />
              {t('aboutReason5')}
            </li>
            <li>
              <div className={classes.sixth} />
              {t('aboutReason6')}
            </li>
          </ul>
        </div>
        <div className={classes.carouselContainer}>
          <PropetyCarousel containerRef={containerRef} />
        </div>
        <div
          className={classNames(
            classes.container,
            searchParam && searchTerm && classes.propertyList
          )}
        >
          <div className={classes.description}>
            <h2>{t('Book the property tour now')}</h2>
            <ol>
              <li>{t('Individual approach to each client')}</li>
              <li>{t('Meetings with developers')}</li>
              <li>{t(`Cultural insight into the island's culture`)}</li>
            </ol>
            <div className={classes.buttons}>
              <Button onClick={() => navigate('/buy')}>
                {t('Reserve a Tour')}
              </Button>
              <Button onClick={() => navigate('/sell')}>
                {t('Learn More')}
              </Button>
            </div>
          </div>
          <div className={classes.videoContainer}>
            <video src={presentationVideo} className={classes.video} controls />
          </div>
        </div>
      </div>
      <div />
    </div>
  );
}
