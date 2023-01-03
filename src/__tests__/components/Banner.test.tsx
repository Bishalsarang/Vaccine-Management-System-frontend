import { screen } from '@testing-library/react';

import Banner from '../../components/Banner';
import { renderWithRouter } from '../../utils/test-utils';

describe('Banner', () => {
  it('should render the banner', () => {
    renderWithRouter(<Banner />);
 
    // Check that the banner is displayed
    expect(screen.getByRole('heading', {  name: /welcome to vaccine management system!/i})).toBeInTheDocument();
  });

  it('should render the login message and signup link if isLoginPage is false', () => {
    // Render the banner
    renderWithRouter(<Banner isLoginPage={false} />);

    // Check that already have an account is shown
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();

    // Check that the login link is displayed
    expect(screen.getByRole('link', {  name: /login/i})).toBeInTheDocument();
  });


  it('should render the signup message and login link if isLoginPage is true', () => {
    // Render the banner
    renderWithRouter(<Banner isLoginPage />);

    // Check that don't have an account is shown
    expect(screen.getByText(/don't have an account\?/i)).toBeInTheDocument();

    // Check that the signup link is displayed
    expect(screen.getByRole('link', {  name: /signup/i})).toBeInTheDocument();
  });
});
