import React from 'react';

import { t } from '../../i18n';
import styles from './styles.module.scss';

const ExamplePage = () => (
  <div className={styles.root}>{t('App-name Example')}</div>
);

export default ExamplePage;
