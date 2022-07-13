import React, { useState, useRef, useContext, useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { UIContext } from '../../context';
import { t } from '../../i18n';
import SearchResults from '../../components/SearchResults';
import Button from '../../components/Button';
import classes from './styles.module.scss';

export default function HomePage() {
  const [searchValue, setSearchValue] = useState('');

  const { searchTerm, setSearchTerm } = useContext(UIContext);

  const containerRef = useRef();

  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get('search');

  const navigate = useNavigate();

  const search = () => {
    if (searchValue && searchValue.trim()) {
      setSearchTerm(searchValue);
      navigate(`/?search=${searchValue}`);
    }
  };

  useEffect(() => {
    if (!searchParam) {
      setSearchValue('');
    } else {
      setSearchValue(searchParam);
      setSearchTerm(searchParam);
    }
  }, [searchParam, setSearchTerm]);

  return (
    <div className={classes.HomePage}>
      <div className={classes.searchContainer}>
        <div className={classes.container} ref={containerRef}>
          <h1>
            Buy with <span>Sun</span>
          </h1>
          <div className={classes.search}>
            <input
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  search();
                }
              }}
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button type="button" onClick={search}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.6964 30.2591L23.4345 22.1292C25.598 19.7786 26.9274 16.6699 26.9274 13.2491C26.9263 5.93135 20.8989 0 13.4632 0C6.0274 0 0 5.93135 0 13.2491C0 20.5668 6.0274 26.4982 13.4632 26.4982C16.6759 26.4982 19.6226 25.3869 21.9372 23.5395L30.2311 31.7014C30.6352 32.0995 31.2913 32.0995 31.6954 31.7014C32.1005 31.3033 32.1005 30.6572 31.6964 30.2591ZM13.4632 24.4597C7.1717 24.4597 2.0715 19.4406 2.0715 13.2491C2.0715 7.05761 7.1717 2.03845 13.4632 2.03845C19.7547 2.03845 24.8548 7.05761 24.8548 13.2491C24.8548 19.4406 19.7547 24.4597 13.4632 24.4597Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={classes.info}>
        <div className={classes.container}>
          {searchParam && searchTerm ? (
            <SearchResults
              containerRef={containerRef}
              searchTerm={searchTerm}
            />
          ) : (
            <>
              <div className={classes.description}>
                <h2>{t('Make your property an island with Sun')}</h2>
                <p>{t(`Lorem Ipsum`)}</p>
                <div className={classes.buttons}>
                  <Button onClick={() => navigate('/rent')}>{t('BUY')}</Button>
                  <Button onClick={() => navigate('/sell')}>{t('SELL')}</Button>
                </div>
              </div>
              <div className={classes.map}>MAP</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
