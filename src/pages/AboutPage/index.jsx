import React, { useRef } from 'react';

import { useQuery } from 'react-query';
import classNames from 'classnames';

import { t } from '../../i18n';
import useResizeObserver from '../../hooks/useResizeObserver';
import BlogPostsService from '../../services/BlogPostsService';
import FAQ from '../../components/FAQ';
import PageTitle from '../../components/PageTitle';
import randomPerson2 from '../../assets/images/about/random-person-2.jpg';
import classes from './styles.module.scss';
import Regular from '../../components/BlogCards/Regular';
import RenderTeam from '../../components/RenderTeam';

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
        title={
          <span>
            {t('About Our')} <br />
            {t('Company')}
            <br />
          </span>
        }
        about="Sun Republic"
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
              <RenderTeam
                name={t('Tural Aliyev')}
                email="tural@sunrepublic.vip"
                phone="+90 533 843 53 63"
                img={randomPerson2}
              />
              <RenderTeam
                name={t('Mamed Gafarov')}
                email="mamed@sunrepublic.vip"
                phone="+90 548 865 36 15"
                img={randomPerson2}
              />
              <RenderTeam
                name={t('Kseniya Kuksina')}
                email="info@sunrepublic.vip"
                phone="+90 533 857 85 35"
                img={randomPerson2}
              />
              <RenderTeam
                name={t('Andrii Yakimets')}
                email="andrew@sunrepublic.vip"
                phone="+90 533 845 77 88"
                img={randomPerson2}
              />
              <RenderTeam
                name={t('Shakhin Aliyev')}
                email="shakhin@sunrepublic.vip"
                phone="+90 533 825 04 55"
                img={randomPerson2}
              />
              <RenderTeam
                name={t('Margarita Zavraiska')}
                email="margo@sunrepublic.vip"
                phone="+90 539 104 77 88"
                img={randomPerson2}
              />
              <RenderTeam
                name={t('Daniyar Ishmedov')}
                email="daniyar@sunrepublic.vip"
                phone="+90 548 847 20 72"
                img={randomPerson2}
              />
              <RenderTeam
                name={t('Nargiz Ibragimova')}
                email="sabina@sunrepublic.vip"
                phone="+90 548 828 83 14"
                img={randomPerson2}
              />
              <RenderTeam
                name={t('Sabina Rahimova')}
                email="sabina@sunrepublic.vip"
                phone="+90 539 100 11 17"
                img={randomPerson2}
              />
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
