import React from 'react';
import PageTitle from '../../components/PageTitle';
import companyQuality from '../../assets/images/tours/companyQuality.svg';
import travelBeach from '../../assets/images/tours/travelBeach.svg';
import building from '../../assets/images/tours/building.svg';
import lawProtection from '../../assets/images/tours/lawProtection.svg';
import writePage from '../../assets/images/tours/writePage.png';
import magnifying from '../../assets/images/tours/magnifying.png';
import shield from '../../assets/images/tours/shield.png';
import palmTree from '../../assets/images/tours/palmTree.png';

import { t } from '../../i18n';
import classes from './styles.module.scss';

export default function PropertyTourPage() {
  return (
    <div className={classes.propertyTourPage}>
      <PageTitle title={t('Property-tours with')} />

      <div className={classes.container}>
        <div className={classes.content}>
          <h1 className={classes.mainHeading}>
            {t('Что такое property-тур?')}
          </h1>
          <p>
            Что такое property-тур? Property-туры совмещают в себе первоклассный
            комфортный и насыщенный отдых и просмотр объектов недвижимости. Вам
            не нужно ни о чем беспокоиться – расскажите о ваших интересах, и мы
            все организуем за вас. Вы увидите лучшие виллы и апартаменты острова
            для инвестиций, понежитесь на лучших пляжах Маврикия, откроете двери
            роскошных закрытых мест, а также при желании попробуете гольф,
            яхтинг, дайвинг, серфинг в самых лучших локациях острова.
          </p>
        </div>
        <div className={classes.features}>
          <div className={classes.feature}>
            <img src={companyQuality} alt="company quality" />
            <div>
              <h3>Отдых высшего класса</h3>
              <p>
                Мы индивидуально подберем места для проживания, ориентируясь на
                ваши предпочтения. Организуем комфортные трансферы любого
                класса. Позаботимся о программе для детей, если вы решите
                отправиться на Маврикий с семьей.
              </p>
            </div>
          </div>
          <div className={classes.feature}>
            <img src={travelBeach} alt="travel Beach" />
            <div>
              <h3>Специальные условия</h3>
              <p>
                Предложим индивидуальную программу посещения Маврикия. Морские
                прогулки на яхте, спортивная рыбалка, индивидуальное обучение
                игры в гольф, SPA-процедуры по специальным условиям.
              </p>
            </div>
          </div>
          <div className={classes.feature}>
            <img src={building} alt="building" />
            <div>
              <h3>Роскошные виллы и апартаменты</h3>
              <p>
                Наша команда предложит объекты, которые идеально подойдут вашим
                требованиям и целям поездки. Из тысяч вариантов мы найдем лучшие
                предложения, чтобы вы смогли насладиться каждой минутой
                пребывания на острове.
              </p>
            </div>
          </div>
          <div className={classes.feature}>
            <img src={lawProtection} alt="shield" />
            <div>
              <h3>Удобство и безопасность</h3>
              <p>
                Вам не нужно будет думать ни о чем – мы все сделаем за вас.
                Гарантируем безопасность и приватность. Организуем сопровождение
                русскоговорящего гида, который ответит на любой вопрос.
              </p>
            </div>
          </div>
        </div>
        <section className={classes.whyus}>
          <div className={classes.container}>
            <h3>Почему именно мы?</h3>
            <div className={classes.whyus_grid}>
              <div className={classes.whyus_grid__element}>
                <img src={writePage} alt="writePage" />
                <p>
                  Мы берем на себя оформление всех документов, трансфер,
                  бронирование отеля, подбор экскурсий и мероприятий в
                  соответствии с вашими интересами.
                </p>
              </div>
              <div className={classes.whyus_grid__element}>
                <img src={magnifying} alt="magnifying glass" />
                <p>
                  Мы берем на себя оформление всех документов, трансфер,
                  бронирование отеля, подбор экскурсий и мероприятий в
                  соответствии с вашими интересами.
                </p>
              </div>
              <div className={classes.whyus_grid__element}>
                <img src={shield} alt="shield" />
                <p>
                  Мы берем на себя оформление всех документов, трансфер,
                  бронирование отеля, подбор экскурсий и мероприятий в
                  соответствии с вашими интересами.
                </p>
              </div>
              <div className={classes.whyus_grid__element}>
                <img src={palmTree} alt="palm tree" />
                <p>
                  Мы берем на себя оформление всех документов, трансфер,
                  бронирование отеля, подбор экскурсий и мероприятий в
                  соответствии с вашими интересами.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={classes.fullSupport}>
          <div className={classes.container}>
            <h3>Полная поддержка при переезде</h3>
            <div className={classes.fullSupport_grid}>
              <div className={classes.fullSupport_grid__element}>
                <img src={writePage} alt="writePage" />
                <p>Регистрация бизнеса</p>
              </div>
              <div className={classes.fullSupport_grid__element}>
                <img src={magnifying} alt="magnifying glass" />
                <p>Открытие счета в банке</p>
              </div>
              <div className={classes.fullSupport_grid__element}>
                <img src={shield} alt="shield" />
                <p>Транспортные услуги</p>
              </div>
              <div className={classes.fullSupport_grid__element}>
                <img src={palmTree} alt="palm tree" />
                <p>Помощь в поступлении в школу</p>
              </div>
              <div className={classes.fullSupport_grid__element}>
                <img src={palmTree} alt="palm tree" />
                <p>Бухгалтерские услуги</p>
              </div>
              <div className={classes.fullSupport_grid__element}>
                <img src={palmTree} alt="palm tree" />
                <p>Переезд с животными</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
