import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Logo from './Logo';

describe('Logo Component', () => {
  it('renders the black logo by default', () => {
    render(<Logo />);
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toContainHTML('<svg');
    expect(logoElement).toContainHTML('fill="black"');
  });

  it('renders the white logo when type is white', () => {
    render(<Logo type="logo" />);
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toContainHTML('<svg');
    expect(logoElement).toContainHTML('fill="white"');
  });

  it('renders the black logo when type is black', () => {
    render(<Logo type="wordLogo" />);
    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toContainHTML('<svg');
    expect(logoElement).toContainHTML('fill="black"');
  });
});
