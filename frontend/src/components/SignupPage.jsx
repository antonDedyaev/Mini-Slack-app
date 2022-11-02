import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Form, Button } from 'react-bootstrap';
import signupImg from '../assets/avatar_1.jpg';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

const SignupPage = () => {
  const { t } = useTranslation();
  const inputRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .min(3, t('formWarnings.nameLength'))
      .max(20, t('formWarnings.nameLength'))
      .required(t('formWarnings.requiredField')),
    password: yup
      .string()
      .trim()
      .min(6, t('formWarnings.minPasswordLength'))
      .required(t('formWarnings.requiredField')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('formWarnings.notMatched'))
      .required(t('formWarnings.requiredField')),
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async ({ username, password }) => {
      try {
        const response = await axios.post(routes.signupPath(), { username, password });
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          inputRef.current.select();
          formik.errors.existingUser = t('errors.alreadyRegistered');
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img src={signupImg} className="rounded-circle" alt={t('pages.signup.title')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('pages.signup.title')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder={t('formWarnings.nameLength')}
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={inputRef}
                    isInvalid={(formik.errors.username && formik.touched.username)
                        || formik.errors.existingUser}
                  />
                  <Form.Label htmlFor="username">{t('pages.signup.username')}</Form.Label>
                  <Form.Control.Feedback placement="right" type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder={t('formWarnings.minPasswordLength')}
                    name="password"
                    aria-describedby="passwordHelpBlock"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={(formik.errors.password && formik.touched.password)
                        || formik.errors.existingUser}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
                  <Form.Label className="form-label" htmlFor="password">{t('pages.signup.password')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    placeholder={t('formWarnings.notMatched')}
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    isInvalid={(formik.errors.confirmPassword && formik.touched.confirmPassword)
                        || formik.errors.existingUser}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.confirmPassword || formik.errors.existingUser}</Form.Control.Feedback>
                  <Form.Label className="form-label" htmlFor="confirmPassword">{t('pages.signup.confirmPassword')}</Form.Label>
                </Form.Group>
                <Button variant="outline-primary" type="submit" className="w-100">{t('pages.signup.signupBtn')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
