/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect, useRef } from 'react';

import { STATIC_URL } from '../../constants/main';
import classes from './styles.module.scss';

export default function ImageGallery({ images = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState(0);
  const [isAnimationDisabled, setIsAnimationsDisabled] = useState(false);

  const currentImageRef = useRef();
  const nextImageRef = useRef();
  const prevImageRef = useRef();
  const imagesRef = useRef();

  const showNextImage = () => {
    if (isAnimationDisabled) {
      return;
    }
    imagesRef.current.style.transform = 'translateX(-100%)';
    setTimeout(() => {
      setIsAnimationsDisabled(true);

      setPrevImageIndex(() => {
        if (nextImageIndex === 0) {
          return images.length - 1;
        }
        return nextImageIndex - 1;
      });
      setCurrentImageIndex(nextImageIndex);
      setNextImageIndex(() => {
        if (nextImageIndex === images.length - 1) {
          return 0;
        }
        return nextImageIndex + 1;
      });
      imagesRef.current.style.transform = 'unset';
    }, 150);
    setTimeout(() => {
      setIsAnimationsDisabled(false);
    }, 250);
  };

  const showPreviousImage = () => {
    if (isAnimationDisabled) {
      return;
    }
    imagesRef.current.style.transform = 'translateX(100%)';
    setTimeout(() => {
      setIsAnimationsDisabled(true);
      setCurrentImageIndex(prevImageIndex);
      setPrevImageIndex(() => {
        if (prevImageIndex === 0) {
          return images.length - 1;
        }
        return prevImageIndex - 1;
      });
      setNextImageIndex(() => {
        if (prevImageIndex === images.length - 1) {
          return 0;
        }
        return prevImageIndex + 1;
      });
      imagesRef.current.style.transform = 'unset';
    }, 150);
    setTimeout(() => {
      setIsAnimationsDisabled(false);
    }, 250);
  };

  const switchToImageIndex = (imageIndex) => {
    if (images.length === 1) {
      return;
    }

    setCurrentImageIndex(imageIndex);
    if (imageIndex === 0) {
      setPrevImageIndex(images.length - 1);
      setNextImageIndex(imageIndex + 1);
    } else if (imageIndex === images.length - 1) {
      setPrevImageIndex(imageIndex - 1);
      setNextImageIndex(0);
    } else {
      setPrevImageIndex(imageIndex - 1);
      setNextImageIndex(imageIndex + 1);
    }
  };

  useEffect(() => {
    setCurrentImageIndex(0);
    if (images.length === 2) {
      setNextImageIndex(1);
      setPrevImageIndex(1);
    } else {
      setNextImageIndex(1);
      setPrevImageIndex(images.length - 1);
    }
  }, [images]);

  return (
    <div className={classes.ImageGallery}>
      <div className={classes.currentImage}>
        {images?.length > 1 && (
          <button
            type="button"
            className={classes.previous}
            onClick={showPreviousImage}
          >
            <svg
              width="12"
              height="23"
              viewBox="0 0 12 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-6.19888e-05 11.9162C-6.19888e-05 11.6605 0.0976877 11.4046 0.292937 11.2094L10.2929 1.21193C10.6837 0.821283 11.3164 0.821283 11.7069 1.21193C12.0974 1.60258 12.0977 2.23517 11.7069 2.62557L2.41394 11.9162L11.7069 21.2068C12.0977 21.5974 12.0977 22.23 11.7069 22.6204C11.3162 23.0108 10.6834 23.0111 10.2929 22.6204L0.292937 12.623C0.0976877 12.4278 -6.19888e-05 12.1719 -6.19888e-05 11.9162Z"
                fill="white"
              />
            </svg>
          </button>
        )}
        <div
          className={classes.images}
          style={{
            left: '-100%',
            transition: isAnimationDisabled ? '' : 'all 0.15s',
          }}
          ref={imagesRef}
        >
          {prevImageIndex !== null && (
            <img
              src={STATIC_URL + images[prevImageIndex]}
              ref={prevImageRef}
              alt=""
            />
          )}
          <img
            src={STATIC_URL + images[currentImageIndex]}
            ref={currentImageRef}
            alt=""
          />
          {nextImageIndex !== null && (
            <img
              src={STATIC_URL + images[nextImageIndex]}
              ref={nextImageRef}
              alt=""
            />
          )}
        </div>
        {images.length > 1 && (
          <button
            type="button"
            className={classes.next}
            onClick={showNextImage}
          >
            <svg
              width="12"
              height="23"
              viewBox="0 0 12 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0001 11.9163C12.0001 12.172 11.9023 12.428 11.7071 12.6232L1.70706 22.6206C1.31631 23.0112 0.683563 23.0112 0.293063 22.6206C-0.0974375 22.2299 -0.0976875 21.5974 0.293063 21.207L9.58606 11.9163L0.293063 2.62573C-0.0976875 2.23508 -0.0976875 1.60249 0.293063 1.21209C0.683812 0.821693 1.31656 0.821444 1.70706 1.21209L11.7071 11.2095C11.9023 11.4047 12.0001 11.6607 12.0001 11.9163Z"
                fill="white"
              />
            </svg>
          </button>
        )}
      </div>
      <div className={classes.thumbnails}>
        {images.map((image, index) => {
          return (
            <img
              src={STATIC_URL + image}
              key={image}
              alt="Thumbnail"
              loading="lazy"
              onClick={() => switchToImageIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
