import React from "react";
import { render, screen } from '@testing-library/react';
import AppRouter from './Router';

test('renders learn react link', () => {
  render(<AppRouter />);
  const logoElement = screen.getByText(/Kozé/i);
  expect(logoElement.textContent).toBe("Kozé")
});
