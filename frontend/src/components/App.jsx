import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';

import TopNav from './TopNav';
import MainPage from './MainPage';
import PageNotFound from './PageNotFound';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import PrivateRoute from '../hooks/PrivateRoute';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <TopNav />
      <Routes>
        <Route
          path="/"
          element={(
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
              )}
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
    <ToastContainer />
  </BrowserRouter>
);

export default App;
