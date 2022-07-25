import classNames from 'classnames';
import React, { useState, Suspense } from 'react';

import PageTitle from '../../components/PageTitle';
import classes from './styles.module.scss';
import { t } from '../../i18n';

const SellForm = React.lazy(() => import('../../components/SellForm'));

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div
      className={classNames(
        classes.SellPage,
        currentStep === 2 && classes.secondStep
      )}
    >
      <PageTitle title={t('Sell with')} />
      <div className={classes.formContainer}>
        <Suspense fallback={<div>Loading...</div>}>
          <SellForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </Suspense>
      </div>
      <div className={classes.emptySpace} />
    </div>
  );
}
