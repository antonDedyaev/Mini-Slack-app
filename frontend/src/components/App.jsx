import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import TopNav from './TopNav';
import MainPage from './MainPage';
import PageNotFound from './PageNotFound';
import LoginPage from './LoginPage';
import PrivateRoute from '../hooks/PrivateRoute';
import { AuthProvider } from '../hooks/AuthProvider';

const App = () => (
  <AuthProvider>
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
  </AuthProvider>
);

export default App;
