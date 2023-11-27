import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
const Layout = ({ children }) => {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  );
};

Layout.propTypes = {};

export default Layout;
