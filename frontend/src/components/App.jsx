import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.css';

import TopNav from './TopNav';
import MainPage from './MainPage';
import PageNotFound from './PageNotFound';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import PrivateRoute from '../hooks/PrivateRoute';
import routes from '../utils/routes';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <TopNav />
      <Routes>
        <Route
          path={routes.mainRoute}
          element={(
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
              )}
        />
        <Route path={routes.loginRoute} element={<LoginPage />} />
        <Route path={routes.signupRoute} element={<SignupPage />} />
        <Route path={routes.unknownRoute} element={<PageNotFound />} />
      </Routes>
    </div>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
