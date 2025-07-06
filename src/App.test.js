import { render, screen } from '@testing-library/react';
import App from './App';

test('MNK Web Application', () => {
  render(<App />);
  const linkElement = screen.getByText(/Profile setup/i);
  expect(linkElement).toBeInTheDocument();
});
