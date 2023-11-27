import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import ThemeContextProvider from './contexts/ThemeContext';
import AuthContextProvider from './contexts/AuthContext';
import Layout from './views/Layout/Layout';
import 'antd/dist/antd.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const allRouters = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
];

root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            {allRouters.map((item, index) => {
              const CommonLayout = item.layout || Layout;

              return <Route key={index} path={item.path} element={<CommonLayout>{item.element}</CommonLayout>} />;
            })}
            <Route key="*" path="*" element={<div>handle 404 not found</div>} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
