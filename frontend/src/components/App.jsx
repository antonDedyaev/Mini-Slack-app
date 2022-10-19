import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';

import TopNav from './TopNav';
import PageNotFound from './PageNotFound';
import LoginPage from './LoginPage';

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <TopNav />
      <Routes>
        <Route path="/" element={<div>Main page</div>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
);

export default App;
