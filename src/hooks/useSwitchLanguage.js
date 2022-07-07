import { useContext } from 'react';

import i18n from '../i18n';
import { UIContext } from '../context';

function useSwitchLanguage() {
  const { forceUpdate } = useContext(UIContext);
  return () => {
    if (i18n.language === 'en') {
      i18n.changeLanguage('ru', () => {
        forceUpdate();
      });
      localStorage.setItem('language', 'ru');
    } else {
      i18n.changeLanguage('en', () => {
        forceUpdate();
      });
      localStorage.setItem('language', 'en');
    }
  };
}

export default useSwitchLanguage;
