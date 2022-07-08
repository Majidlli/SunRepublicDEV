import React, { useRef } from 'react';

import { useQuery } from 'react-query';

import { t } from '../../i18n';
import BlogPostsService from '../../services/BlogPostsService';
import MostPopularBig from '../../components/BlogCards/MostPopularBig';
import MostPopularSmall from '../../components/BlogCards/MostPopularSmall';
import Regular from '../../components/BlogCards/Regular';
import PageTitle from '../../components/PageTitle';
import useResizeObserver from '../../hooks/useResizeObserver';
import classes from './styles.module.scss';

export default function WhatWeSellPage() {
  const mostPopularBlogPosts = useQuery(
    'mostPopularBlogPosts',
    BlogPostsService.getMostPopularPosts
  );

  const blogPosts = useQuery('blogPosts', BlogPostsService.getPosts);

  const containerRef = useRef();

  const { width } = useResizeObserver(containerRef);

  const postWidth = (width - 40) / 3;

  return (
    <div className={classes.WhatWeSellPage}>
      <PageTitle title={t('Title')} />
      <div className={classes.container} ref={containerRef}>
        {mostPopularBlogPosts?.data && (
          <div className={classes.mostPopular}>
            <h2>{t('Title')}</h2>
            <div className={classes.posts}>
              {mostPopularBlogPosts.data[0] && (
                <MostPopularBig data={mostPopularBlogPosts.data[0]} />
              )}
              <div className={classes.list}>
                {mostPopularBlogPosts.data[1] && (
                  <MostPopularSmall data={mostPopularBlogPosts.data[1]} />
                )}
                {mostPopularBlogPosts.data[2] && (
                  <MostPopularSmall data={mostPopularBlogPosts.data[2]} />
                )}
                {mostPopularBlogPosts.data[3] && (
                  <MostPopularSmall data={mostPopularBlogPosts.data[3]} />
                )}
              </div>
            </div>
          </div>
        )}
        <div className={classes.blogPostsList}>
          <h2>{t('Title')}</h2>
          {blogPosts?.data && (
            <ul>
              {blogPosts.data.map((post) => {
                return (
                  <li key={post.id}>
                    <Regular
                      postWidth={postWidth}
                      postsCount={blogPosts.data.length}
                      data={post}
                    />
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
