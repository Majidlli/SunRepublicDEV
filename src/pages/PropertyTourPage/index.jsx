import React, { useRef } from 'react';
import classNames from 'classnames';
import PageTitle from '../../components/PageTitle';
import companyQuality from '../../assets/images/tours/companyQuality.svg';
import travelBeach from '../../assets/images/tours/travelBeach.svg';
import building from '../../assets/images/tours/building.svg';
import lawProtection from '../../assets/images/tours/lawProtection.svg';
import writePage from '../../assets/images/tours/writePage.png';
import magnifying from '../../assets/images/tours/magnifying.png';
import shield from '../../assets/images/tours/shield.png';
import palmTree from '../../assets/images/tours/palmTree.png';
import briefcase from '../../assets/images/tours/briefcase.png';
import plane from '../../assets/images/tours/plane.png';
import storecost from '../../assets/images/tours/store_cost.svg';
import teacher from '../../assets/images/tours/teacher.svg';
import cat from '../../assets/images/tours/cat.svg';

import { t } from '../../i18n';
import classes from './styles.module.scss';

export default function PropertyTourPage() {
  const contentRef = useRef();
  return (
    <div className={classes.propertyTourPage}>
      <PageTitle title={t('Property-tours with')} />

      <div className={classes.container}>
        <div className={classNames(classes.content)} ref={contentRef}>
          <h1 className={classes.mainHeading}>
            {t("What's a property tour?")}
          </h1>
          <p>{t('About tour')}</p>
        </div>
        <section className={classes.content}>
          <div className={classes.features}>
            <img src={companyQuality} alt="company quality" />
            <div>
              <h3>{t('tour feature1')}</h3>
              <p>{t('tour feature desc1')}</p>
            </div>
          </div>
          <div className={classes.features}>
            <img src={travelBeach} alt="travel Beach" />
            <div>
              <h3>{t('tour feature2')}</h3>
              <p>{t('tour feature desc2')}</p>
            </div>
          </div>
          <div className={classes.features}>
            <img src={building} alt="building" />
            <div>
              <h3>{t('tour feature3')}</h3>
              <p>{t('tour feature desc3')}</p>
            </div>
          </div>
          <div className={classes.features}>
            <img src={lawProtection} alt="shield" />
            <div>
              <h3>{t('tour feature4')}</h3>
              <p>{t('tour feature desc4')}</p>
            </div>
          </div>
        </section>
        <section className={classes.content}>
          <h3 className={classes.whyus_heading}>{t('Why us')}</h3>
          <div className={classes.whyus}>
            <div className={classes.whyus__element}>
              <img src={writePage} alt="writePage" />
              <p>{t('whyus desc1')}</p>
            </div>
            <div className={classes.whyus__element}>
              <img src={magnifying} alt="magnifying glass" />
              <p>{t('whyus desc2')}</p>
            </div>
            <div className={classes.whyus__element}>
              <img src={shield} alt="shield" />
              <p>{t('whyus desc3')}</p>
            </div>
            <div className={classes.whyus__element}>
              <img src={palmTree} alt="palm tree" />
              <p>{t('whyus desc4')}</p>
            </div>
          </div>
        </section>
        <section className={classes.content}>
          <h3 className={classes.fullSupport_heading}>{t('tour support')}</h3>
          <div className={classes.fullSupport}>
            <div className={classes.fullSupport__element}>
              <img src={briefcase} alt="writePage" />
              <p>{t('tour support1')}</p>
            </div>
            <div className={classes.fullSupport__element}>
              <img src={storecost} alt="magnifying glass" />
              <p>{t('tour support2')}</p>
            </div>
            <div className={classes.fullSupport__element}>
              <img src={plane} alt="shield" />
              <p>{t('tour support3')}</p>
            </div>
            <div className={classes.fullSupport__element}>
              <img src={teacher} alt="palm tree" />
              <p>{t('tour support4')}</p>
            </div>
            <div className={classes.fullSupport__element}>
              <img src={writePage} alt="palm tree" />
              <p>{t('tour support5')}</p>
            </div>
            <div className={classes.fullSupport__element}>
              <img src={cat} alt="palm tree" />
              <p>{t('tour support6')}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
