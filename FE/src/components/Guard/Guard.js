import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Guard = ({ children }) => {
  const authContextData = useContext(AuthContext);
  const { isAuthenticated } = authContextData;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      // lay data tu auth context
      // set lai setDataInfor
    }
  }, []);

  return <div>{children}</div>;

};
Guard.propTypes = {};

export default Guard;
