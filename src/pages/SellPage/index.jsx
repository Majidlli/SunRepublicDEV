import classNames from 'classnames';
import React, { useState, Suspense } from 'react';

import classes from './styles.module.scss';

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
      <div className={classes.backgroundContainer}>
        <div className={classes.container}>
          <h1>
            Sell with <span>Sun</span>
          </h1>
        </div>
      </div>
      <div className={classes.formContainer}>
        <Suspense fallback={<div>Loading...</div>}>
          <SellForm currentStep={currentStep} setCurrentStep={setCurrentStep} />
        </Suspense>
      </div>
      <div className={classes.emptySpace} />
    </div>
  );
}
