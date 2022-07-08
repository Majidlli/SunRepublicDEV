import React from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Button from '../../components/Button';
import PhoneInput from '../../components/PhoneInput';
import TextInput from '../../components/TextInput';
import { t } from '../../i18n';
import PageTitle from '../../components/PageTitle';
import instagramIcon from '../../assets/images/instagram.svg';
import facebookIcon from '../../assets/images/facebook.svg';
import whatsAppIcon from '../../assets/images/whatsapp.svg';
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
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      description: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className={classes.ContactUsPage}>
      <PageTitle title="Title" />
      <div className={classes.forms}>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
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
        <div className={classes.contactInfo}>
          <h2>{t('CONTACT US')}</h2>
          <div className={classes.social}>
            <a
              href="https://www.instagram.com/sunrepublic.vip/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <div>
              <img src={facebookIcon} alt="Facebook" />
            </div>
            <div>
              <img src={whatsAppIcon} alt="WhatsApp" />
            </div>
          </div>
          <div className={classes.phoneNumbers}>
            <a className={classes.phone} href="tel:(123) 000 0110">
              (123) 000 0110
            </a>
            <a className={classes.phone} href="tel:(123) 000 0110">
              (123) 000 0110
            </a>
            <a className={classes.phone} href="tel:(123) 000 0110">
              (123) 000 0110
            </a>
          </div>
        </div>
      </div>
      <div className={classes.emptySpace} />
    </div>
  );
}
