import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Form, Button } from 'react-bootstrap';
import signupImg from '../assets/avatar_1.jpg';
import useAuth from '../hooks/useAuth';
import routes from '../utils/routes';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Обязательное поле')
    .trim()
    .test(
      'length',
      'От 3 до 20 символов',
      (value) => (value.length >= 3 && value.length <= 20),
    ),
  password: yup
    .string()
    .required('Обязательное поле')
    .trim()
    .min(6, 'Не менее 6 символов'),
  confirmPassword: yup
    .string()
    .required('Обязательное поле')
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});

const SignupPage = () => {
  const inputRef = useRef();
  const auth = useAuth();
  const navigate = useNavigate();
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
        console.log(response);
        auth.logIn(response.data);
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          inputRef.current.select();
          formik.errors.existingUser = 'Такой пользователь уже существует';
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
                <img src={signupImg} className="rounded-circle" alt="Регистрация" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder="От 3 до 20 символов"
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
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                  <Form.Control.Feedback placement="right" type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder="Не менее 6 символов"
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
                  <Form.Label className="form-label" htmlFor="password">Пароль</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    placeholder="Пароли должны совпадать"
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
                  <Form.Label className="form-label" htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                </Form.Group>
                <Button variant="outline-primary" type="submit" className="w-100">Зарегистрироваться</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
