import React from 'react';

import axios from 'axios';
import { useQueryClient } from 'react-query';

import Button from '../../components/Button';
import { API_URL } from '../../constants/main';
import classes from './styles.module.scss';

async function getProperty(recent) {
  const response = await axios.get(`${API_URL}/property`, {
    params: {
      recent,
    },
  });
  return response.data;
}

export default function HomePage() {
  const queryClinet = useQueryClient();

  queryClinet.prefetchQuery('property', () => getProperty(false));
  queryClinet.prefetchQuery('recentProperty', () => getProperty(true));

  return (
    <div className={classes.HomePage}>
      <div className={classes.searchContainer}>
        <div className={classes.container}>
          <h1>
            Buy with <span>Sun</span>
          </h1>
          <div className={classes.search}>
            <input type="text" />
            <button type="button">
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
          <div className={classes.description}>
            <h2>Make your property an island with Sun</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div className={classes.buttons}>
              <Button>RENT</Button>
              <Button>SELL</Button>
            </div>
          </div>
          <div className={classes.map}>MAP</div>
        </div>
      </div>
    </div>
  );
}
