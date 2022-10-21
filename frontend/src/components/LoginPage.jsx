import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Form, Button } from 'react-bootstrap';
import loginImg from '../assets/avatar.jpeg';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('required'),
  password: yup
    .string()
    .required('required'),
});
const LoginPage = () => {
  const [failedAuth, setFailedAuth] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

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
        console.log(response.data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setFailedAuth(true);
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
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImg} className="rounded-circle" alt="Войти" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    autoComplete="username"
                    required
                    placeholder="Ваш ник"
                    id="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    isInvalid={failedAuth}
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4 position-relative">
                  <Form.Control
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    isInvalid={failedAuth}
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
                </Form.Group>
                <Button variant="outline-primary" type="submit" className="w-100 mb-3">Войти</Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
