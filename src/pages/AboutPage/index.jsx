import React, { useRef } from 'react';

import { useQuery } from 'react-query';
import classNames from 'classnames';

import { t } from '../../i18n';
import useResizeObserver from '../../hooks/useResizeObserver';
import BlogPostsService from '../../services/BlogPostsService';
import FAQ from '../../components/FAQ';
import PageTitle from '../../components/PageTitle';
import classes from './styles.module.scss';
import Regular from '../../components/BlogCards/Regular';
import useWindowDimensions from '../../hooks/useWindowDimensions';

export default function AboutPage() {
  const { width: dimWidth } = useWindowDimensions();
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
        title={
          <span>
            {t('About Our')} {t('Company')}
            <br />
          </span>
        }
        about="Sun Republic"
        aboutPage
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
          {dimWidth > 1024 && (
            <div className={classes.faq}>
              <h2>{t('Frequently Asked Questions')}</h2>
            </div>
          )}
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
