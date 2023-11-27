import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Popover } from 'antd';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { deleteAllCookies } from '../../helpers/cookie';

const Navigate = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const contextAuth = useContext(AuthContext);
  const { isAuthenticated, userInfo } = contextAuth;
  const user = JSON.parse(userInfo);

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: 'home',
    },
    ...(location.pathname !== '/login'
      ? [
          {
            label: !isAuthenticated ? (
              <Link to="/login">login</Link>
            ) : (
              <div>
                <Popover
                  content={
                    <span
                      className="cursor-pointer text-blue-600"
                      onClick={() => {
                        deleteAllCookies();
                        localStorage.clear();
                        navigate('/login');
                      }}
                    >
                      log out
                    </span>
                  }
                >
                  {user.name}
                </Popover>
              </div>
            ),
            key: 'login',
          },
        ]
      : []),
  ];
  return <Menu className="flex justify-between" mode="horizontal" items={items} />;
};

Navigate.propTypes = {};

export default Navigate;
