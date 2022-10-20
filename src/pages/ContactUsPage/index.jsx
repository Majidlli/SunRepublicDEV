import React, { useRef } from 'react';

import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMediaQuery } from 'react-responsive';

import Button from '../../components/Button';
import RenderTeam from '../../components/RenderTeam';
import PhoneInput from '../../components/PhoneInput';
import TextInput from '../../components/TextInput';
import { t } from '../../i18n';
import PageTitle from '../../components/PageTitle';
import randomPerson2 from '../../assets/images/about/random-person-2.jpg';
import instagramIcon from '../../assets/images/instagram.svg';
import facebookIcon from '../../assets/images/facebook.svg';
import whatsAppIcon from '../../assets/images/whatsapp.svg';
import youtubeIcon from '../../assets/images/youtube.png';
import { API_URL } from '../../constants/main';
import useResizeObserver from '../../hooks/useResizeObserver';
import classes from './styles.module.scss';

const validationSchema = yup.object({
  name: yup.string().trim().required('This field is required'),
  phone: yup
    .string()
    .test('validatePhone', 'Phone number is not valid', (value) => {
      return new Promise((resolve) => {
        import('react-phone-number-input')
          .then(({ isValidPhoneNumber }) => {
            const isValidPhone = isValidPhoneNumber(`+${value}`);
            if (isValidPhone) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(() => {
            resolve(false);
          });
      });
    })
    .required('This field is required'),
  email: yup
    .string()
    .trim()
    .email('Please enter a valid email')
    .required('This field is required'),
  description: yup.string().trim().required('This field is required'),
});

export default function ContactUsPage() {
  const sendMessage = async (values, { resetForm }) => {
    try {
      await axios.post(`${API_URL}/contact`, values);
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      description: '',
    },
    validationSchema,
    onSubmit: sendMessage,
  });

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const formRef = useRef();
  const contactsRef = useRef();

  const { height } = useResizeObserver(formRef);
  const { height: contactsHeight } = useResizeObserver(contactsRef);

  return (
    <div className={classes.ContactUsPage}>
      <PageTitle title={t('Write with')} />
      <div className={classes.forms}>
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
          ref={formRef}
        >
          <h2>{t('MAKE A TOUR WITH US')}</h2>
          <div className={classes.inputs}>
            <div className={classes.textInputContainer}>
              <TextInput
                label={t('Name')}
                name="name"
                placeholder={t('Enter your Name')}
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <div className={classes.error}>{formik.errors.name}</div>
              )}
            </div>
            <div className={classes.textInputContainer}>
              <PhoneInput
                label={t('Phone')}
                name="phone"
                placeholder=""
                value={formik.values.phone}
                setFieldValue={formik.setFieldValue}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className={classes.error}>{formik.errors.phone}</div>
              )}
            </div>
            <div className={classes.textInputContainer}>
              <TextInput
                label={t('Email')}
                name="email"
                placeholder={t('Enter your Email')}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <div className={classes.error}>{formik.errors.email}</div>
              )}
            </div>
            <div className={classes.textInputContainer}>
              <TextInput
                label={t('Description')}
                name="description"
                placeholder={t('Tell more')}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description && (
                <div className={classes.error}>{formik.errors.description}</div>
              )}
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <Button
              onClick={formik.handleSubmit}
              disabled={
                !formik.isValid ||
                Object.keys(formik.values).every(
                  (key) => formik.values[key] === ''
                )
              }
            >
              {t('SEND')}
            </Button>
          </div>
        </form>
        <div className={classes.contactInfo} ref={contactsRef}>
          <h2>{t('CONTACT US')}</h2>
          <div className={classes.social}>
            <a
              href="https://www.instagram.com/sunrepublic.vip/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/sunrepublic.vip/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a
              href="https://wa.me/905338457788"
              target="_blank"
              rel="noreferrer"
            >
              <img src={whatsAppIcon} alt="WhatsApp" />
            </a>
            <a
              href="https://www.youtube.com/c/IrinDrealty"
              target="_blank"
              rel="noreferrer"
            >
              <img src={youtubeIcon} alt="YouTube" />
            </a>
          </div>
          <div className={classes.phoneNumbers}>
            <a className={classes.phone} href="tel:+90 533 845 77 88">
              +90 533 845 77 88
            </a>
            <a className={classes.phone} href="tel:+90 533 825 04 55">
              +90 533 825 04 55
            </a>
            <a className={classes.phone} href="tel:+90 548 865 36 15">
              +90 548 865 36 15
            </a>
          </div>
        </div>
      </div>
      <div className={classes.container}>
        <div
          className={classes.team}
          style={{
            paddingTop: isTabletOrMobile
              ? height + contactsHeight + 100
              : height - 100,
          }}
        >
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
      </div>
    </div>
  );
}
