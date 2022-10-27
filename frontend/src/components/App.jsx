import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import TopNav from './TopNav';
// eslint-disable-next-line import/no-cycle
import MainPage from './MainPage';
import PageNotFound from './PageNotFound';
import LoginPage from './LoginPage';
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
