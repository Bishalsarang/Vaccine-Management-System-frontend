import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LoginPage from '../../pages/LoginPage';
import { BannerProps } from '../../components/Banner/Banner';

import { renderWithProviders } from '../../utils/test-utils';

jest.mock('../../components/Banner', () => {
  return ({ isLoginPage }: BannerProps) => {
    return isLoginPage ? (
      <div data-testid="login-page-banner">Login</div>
    ) : (
      <div data-testid="signup-page-banner">Signup</div>
    );
  };
});

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));


describe('Login Page', () => {
  let usernameField: HTMLElement;
  let passwordField: HTMLElement;

  beforeEach(() => {
    renderWithProviders(<LoginPage />);
    usernameField = screen.getByLabelText(/username/i);
    passwordField = screen.getByLabelText(/password/i);
  });

  it('should have a Banner component for the login', async () => {
    // verify if the banner is for login page.
    const loginPageBanner = await screen.findByTestId('login-page-banner');
    expect(loginPageBanner).toBeInTheDocument();
  });

  it('should have render title, username, password field and login button', async () => {
    // assert that the form fields and submit button are displayed
    expect(screen.getByRole('heading', {  name: /login to your account/i})).toBeInTheDocument();
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/login/i);
  });

  it('should show an error message when submitting the form with invalid input', async () => {
    // give invalid input. SInce PW is at lkeast 8 characters
    await userEvent.type(passwordField, '12');

    // Button should be disabled for invalid input.
    expect(screen.getByRole('button', { name: /login/i })).toHaveAttribute('aria-disabled')
  });


  it('should not disable the form for valid input', async () => {
    // Fill the userinputs. Click ot focus on outside because we are running validation on blur.
    await userEvent.type(usernameField, 'Johny');
    await userEvent.type(passwordField, '12345678');

    // Simulate outside click.
    await userEvent.click(document.body);

    // Button should not be disabled.
    expect(screen.getByRole('button', { name: /login/i })).not.toHaveAttribute('aria-disabled')
  });
});


