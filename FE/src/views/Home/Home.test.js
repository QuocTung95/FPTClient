import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

test('test home page', async () => {
  render(<Home />);
});
