import React from 'react';
import { render } from '@testing-library/react';
import ThemeContextProvider from './src/contexts/ThemeContext';
import AuthContextProvider from './src/contexts/AuthContext';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeContextProvider theme="light">
      <AuthContextProvider>{children}</AuthContextProvider>
    </ThemeContextProvider>
  );
};

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
