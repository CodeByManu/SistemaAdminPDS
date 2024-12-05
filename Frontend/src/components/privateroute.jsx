import React, { useEffect, useState } from 'react';
import { Navigate, Route } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null while loading

  useEffect(() => {
    // Verificar el estado de autenticación
    axios.get('/api/v1/auth_status')
      .then(response => {
        setIsAuthenticated(response.data.logged_in);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return null; // Render nothing while checking the authentication
  }

  // Conditionally render the route component or redirect to login
  return (
    <Route
      {...rest}
      element={isAuthenticated ? Component : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
