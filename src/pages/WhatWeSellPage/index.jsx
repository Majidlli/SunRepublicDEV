import React, { useRef } from 'react';

import { useQuery } from 'react-query';
import { useMediaQuery } from 'react-responsive';

import { useInView } from 'react-intersection-observer';
import { t } from '../../i18n';
import StickyMenu from '../../components/StickyMenu';
import BlogButtons from '../../components/StickyMenu/BlogButtons';
import BlogPostsService from '../../services/BlogPostsService';
import { STATIC_URL } from '../../constants/main';
// import MostPopularBig from '../../components/BlogCards/MostPopularBig';
// import MostPopularSmall from '../../components/BlogCards/MostPopularSmall';
// import Regular from '../../components/BlogCards/Regular';
import PageTitle from '../../components/PageTitle';
// import useResizeObserver from '../../hooks/useResizeObserver';
import classes from './styles.module.scss';

export default function WhatWeSellPage() {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const ref = useRef(null);
  const famagustaRef = useInView({
    /* Optional options */
    threshold: 0.5,
  });
  const nothernCyprusRef = useInView({
    /* Optional options */
    threshold: 0.5,
  });
  const kyreniaRef = useInView({
    /* Optional options */
    threshold: 0.5,
  });
  const nicosiaRef = useInView({
    /* Optional options */
    threshold: 0.5,
  });

  const blogPosts = useQuery('blogPosts', BlogPostsService.getPosts);

  const containerRef = useRef();
  const getRefs = (name) => {
    if (name === 'Famagusta') return famagustaRef.ref;
    if (name === 'Northern Cyprus') return nothernCyprusRef.ref;
    if (name === 'Kyrenia') return kyreniaRef.ref;
    if (name === 'Nicosia') return nicosiaRef.ref;
    return ref;
  };

  return (
    <div className={classes.WhatWeSellPage}>
      {!isTabletOrMobile && (
        <StickyMenu>
          <BlogButtons
            activeRef={[
              { name: 'Nicosia', isActiveRef: nicosiaRef.inView },
              { name: 'Kyrenia', isActiveRef: kyreniaRef.inView },
              { name: 'Northern Cyprus', isActiveRef: nothernCyprusRef.inView },
              { name: 'Famagusta', isActiveRef: famagustaRef.inView },
            ]}
          />
        </StickyMenu>
      )}
      <PageTitle title={t('Read with')} />
      <div className={classes.container} ref={containerRef}>
        <div className={classes.blogPostsList}>
          {blogPosts?.data && (
            <ul id="list">
              {blogPosts.data.map((post) => {
                return (
                  <li
                    key={post.id}
                    className={classes.blogItem}
                    id={post.title}
                    ref={getRefs(post.title)}
                  >
                    <div className={classes.container}>
                      <div className={classes.content}>
                        <img src={STATIC_URL + post.imagePath} alt="" />
                        <h1>{post.title}</h1>
                        <div
                          className={classes.textContent}
                          dangerouslySetInnerHTML={{ __html: post.textContent }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
