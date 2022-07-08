/* eslint-disable react/no-danger */
import React from 'react';

import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import i18n, { t } from '../../i18n';
import { STATIC_URL } from '../../constants/main';
import BlogPostsService from '../../services/BlogPostsService';
import PageTitle from '../../components/PageTitle';
import classes from './styles.module.scss';

export default function BlogPostPage() {
  const { id } = useParams();

  const { data } = useQuery(['blogPost', id], () =>
    BlogPostsService.getPost(id)
  );

  let title = data?.title;
  let textContent = data?.textContent;
  if (i18n.language === 'en') {
    title = data?.title || data?.titleRus;
    textContent = data?.textContent || data?.textContentRus;
  } else if (i18n.language === 'ru') {
    title = data?.titleRus || data?.title;
    textContent = data?.textContentRus || data?.textContent;
  }

  return (
    <div className={classes.BlogPostPage}>
      <PageTitle title={t('Title')} />
      <div className={classes.container}>
        <div className={classes.content}>
          <img src={STATIC_URL + data?.imagePath} alt="" />
          <h1>{title}</h1>
          <div
            className={classes.textContent}
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        </div>
      </div>
    </div>
  );
}
