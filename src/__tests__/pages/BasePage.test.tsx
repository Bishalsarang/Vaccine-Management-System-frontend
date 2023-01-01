import { render, screen } from '@testing-library/react';

import BasePage  from '../../pages/BasePage';

jest.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet" />
}));

jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />
}));


describe('BasePage', () => {
  const toastContainerClass = 'toast-container';

  it('should render the Outlet component', () => {
    render(<BasePage />);

    expect(screen.getByTestId(toastContainerClass)).toBeInTheDocument();
  });

  it('should render the ToastContainer component', () => {
    render(<BasePage />);
    expect(screen.getByTestId(toastContainerClass)).toBeInTheDocument();
  });
});
