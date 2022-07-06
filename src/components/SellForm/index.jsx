import React, { useState } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import classNames from 'classnames';

import Images from './Images';
import Button from '../Button';
import TextInput from '../TextInput';
import PhoneInput from '../PhoneInput';
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

export default function SellForm({ currentStep, setCurrentStep }) {
  const [images, setImages] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      description: '',
    },
    validationSchema,
    onSubmit: () => {
      setCurrentStep(2);
    },
  });

  return (
    <form
      className={classNames(
        classes.SellForm,
        currentStep === 2 && classes.secondStep
      )}
      onSubmit={formik.handleSubmit}
    >
      <h2>TITLE</h2>
      <div className={classes.steps}>
        <div
          className={classNames(
            classes.step,
            currentStep === 1 && classes.active,
            currentStep === 2 && classes.finished
          )}
        >
          1 step
        </div>
        <div
          className={classNames(
            classes.step,
            currentStep === 2 && classes.active,
            isFinished && classes.finished
          )}
        >
          2 step
        </div>
      </div>
      {currentStep === 1 && (
        <div className={classes.inputs}>
          <div className={classes.textInputContainer}>
            <TextInput
              label="Name"
              name="name"
              placeholder="Enter your Name"
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
              label="Phone"
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
              label="Email"
              name="email"
              placeholder="Enter your Email"
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
              label="Description"
              name="description"
              placeholder="Tell more"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.description && formik.touched.description && (
              <div className={classes.error}>{formik.errors.description}</div>
            )}
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div className={classes.imagesContainer}>
          <Images images={images} setImages={setImages} />
        </div>
      )}
      <div className={classes.buttonContainer}>
        {currentStep === 1 && (
          <Button
            onClick={formik.handleSubmit}
            disabled={
              !formik.isValid ||
              Object.keys(formik.values).every(
                (key) => formik.values[key] === ''
              )
            }
          >
            NEXT
          </Button>
        )}
        {currentStep === 2 && (
          <Button
            onClick={() => setIsFinished(true)}
            disabled={images.length === 0}
          >
            SEND
          </Button>
        )}
      </div>
    </form>
  );
}
