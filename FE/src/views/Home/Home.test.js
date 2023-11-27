import React from 'react';
import { screen } from '@testing-library/react';
import { render, fireEvent } from '../../../test-utils';
import '@testing-library/jest-dom';
import Home from './Home';

test('test home page', async () => {
  render(<Home />);
  expect(1).toBe(1);
});
