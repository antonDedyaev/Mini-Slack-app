import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Form, Button } from 'react-bootstrap';
import loginImg from '../assets/avatar.jpeg';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

const LoginPage = () => {
  const [failedAuth, setFailedAuth] = useState(false);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(),
    password: yup
      .string()
      .trim()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async ({ username, password }) => {
      setFailedAuth(false);

      try {
        const response = await axios.post(routes.loginPath(), { username, password });
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        switch (err.message) {
          case 'Request failed with status code 401':
            formik.errors.wrongCredentials = t('errors.wrongCredentials');
            setFailedAuth(true);
            break;
          case 'Network Error':
            toast.error(t('toasts.noConnection'));
            break;
          default:
            toast.error(t('toasts.unknownError'));
            throw err;
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImg} className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">{t('pages.login.title')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder={t('pages.login.nickname')}
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={failedAuth}
                  />
                  <Form.Label htmlFor="username">{t('pages.login.nickname')}</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4 position-relative">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder={t('pages.login.password')}
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={failedAuth}
                  />
                  <Form.Label htmlFor="password">{t('pages.login.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>{formik.errors.wrongCredentials}</Form.Control.Feedback>
                </Form.Group>
                <Button variant="outline-primary" type="submit" className="w-100 mb-3">{t('pages.login.loginBtn')}</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('pages.login.noAccInquiry')}</span>
                {' '}
                <a href="/signup">{t('pages.login.signupLink')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
