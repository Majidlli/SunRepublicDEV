import React, { useRef } from 'react';

import { useQuery } from 'react-query';
import classNames from 'classnames';

import { t } from '../../i18n';
import useResizeObserver from '../../hooks/useResizeObserver';
import BlogPostsService from '../../services/BlogPostsService';
import FAQ from '../../components/FAQ';
import Button from '../../components/Button';
import PageTitle from '../../components/PageTitle';
import randomPerson1 from '../../assets/images/about/random-person-1.jpg';
import randomPerson2 from '../../assets/images/about/random-person-2.jpg';
import randomPerson3 from '../../assets/images/about/random-person-3.jpg';
import randomPerson4 from '../../assets/images/about/random-person-4.jpg';
import randomPerson5 from '../../assets/images/about/random-person-5.jpg';
import randomPerson6 from '../../assets/images/about/random-person-6.jpg';
import classes from './styles.module.scss';
import Regular from '../../components/BlogCards/Regular';

export default function AboutPage() {
  const { data } = useQuery(
    'mostPopularBlogPosts',
    BlogPostsService.getMostPopularPosts
  );

  const contentRef = useRef();

  const { width } = useResizeObserver(contentRef);

  const postWidth = (width - 40) / 3;

  return (
    <div className={classes.AboutPage}>
      <PageTitle
        about
        title={
          <span>
            {t('About Our')} <br />
            {t('Company')}
            <br />
            Sun Republic
          </span>
        }
      />
      <div className={classes.container}>
        <div className={classNames(classes.content)} ref={contentRef}>
          <h1 className={classes.mainHeading}>{t('Title')}</h1>
          <ol>
            <li>{t('aboutInfo1')}</li>
            <li>{t('aboutInfo2')}</li>
            <li>{t('aboutInfo3')}</li>
            <li>{t('aboutInfo4')}</li>
          </ol>
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
          <div className={classes.team}>
            <h2>{t('Meet Our Team')}</h2>
            <ul>
              <li>
                <div className={classes.photoContainer}>
                  <img src={randomPerson1} alt="" />
                  <div className={classes.buttonContainer}>
                    <Button>{t('CONTACT')}</Button>
                  </div>
                </div>
                <h1>{t('Name')}</h1>
                <p>{t('aboutLorem')}</p>
              </li>
              <li>
                <div className={classes.photoContainer}>
                  <img src={randomPerson2} alt="" />
                  <div className={classes.buttonContainer}>
                    <Button>{t('CONTACT')}</Button>
                  </div>
                </div>
                <h1>{t('Name')}</h1>
                <p>{t('aboutLorem')}</p>
              </li>
              <li>
                <div className={classes.photoContainer}>
                  <img src={randomPerson3} alt="" />
                  <div className={classes.buttonContainer}>
                    <Button>{t('CONTACT')}</Button>
                  </div>
                </div>
                <h1>{t('Name')}</h1>
                <p>{t('aboutLorem')}</p>
              </li>
              <li>
                <div className={classes.photoContainer}>
                  <img src={randomPerson4} alt="" />
                  <div className={classes.buttonContainer}>
                    <Button>{t('CONTACT')}</Button>
                  </div>
                </div>
                <h1>{t('Name')}</h1>
                <p>{t('aboutLorem')}</p>
              </li>
              <li>
                <div className={classes.photoContainer}>
                  <img src={randomPerson5} alt="" />
                  <div className={classes.buttonContainer}>
                    <Button>{t('CONTACT')}</Button>
                  </div>
                </div>
                <h1>{t('Name')}</h1>
                <p>{t('aboutLorem')}</p>
              </li>
              <li>
                <div className={classes.photoContainer}>
                  <img src={randomPerson6} alt="" />
                  <div className={classes.buttonContainer}>
                    <Button>{t('CONTACT')}</Button>
                  </div>
                </div>
                <h1>{t('Name')}</h1>
                <p>{t('aboutLorem')}</p>
              </li>
            </ul>
          </div>
          <div className={classes.faq}>
            <h2>{t('Frequently Asked Questions')}</h2>
          </div>
        </div>
      </div>
      <FAQ />
      <div className={classes.container}>
        <div className={classes.content}>
          <div className={classes.blog}>
            <h2>{t('Have A Look To Our Blog')}</h2>
            <div className={classes.posts}>
              <ul>
                {data && data[0] && (
                  <li>
                    <Regular
                      postWidth={postWidth}
                      postsCount={data.length}
                      data={data[0]}
                    />
                  </li>
                )}
                {data && data[1] && (
                  <li>
                    <Regular
                      postWidth={postWidth}
                      postsCount={data.length}
                      data={data[1]}
                    />
                  </li>
                )}
                {data && data[2] && (
                  <li>
                    <Regular
                      postWidth={postWidth}
                      postsCount={data.length}
                      data={data[2]}
                    />
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
