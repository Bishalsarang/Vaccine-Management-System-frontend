import {render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SidebarProps } from '../../components/Sidebar';

import DashboardPage from '../../pages/DashboardPage';

/**
 * We aren't actually using the actual implemntation. But using the mock component to test out the props and rendering.
 * The implementation for <Sidebar/> component should be in <SIdebar/> itself.
 */
jest.mock('../../components/Sidebar', () => {
  return ({ isOpen, onOpen, onClose }: SidebarProps) => {
    return (
    <div
      data-testid="sidebar"
      className={isOpen ? 'opened' : 'closed'}
    >
      <button data-testid="sidebar-open-button" onClick={onOpen}>Open</button>
      <button data-testid="sidebar-close-button" onClick={onClose}>Close</button>
    </div>
  );}
});

jest.mock('../../pages/ContentPage', () => {
  return () => <div data-testid="content-page" />;
});


describe('DashboardPage', () => {

  it('should render Sidebar and ContentPage', () => {
    render(<DashboardPage />);

    // Checks if the component are properly rendered.
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('content-page')).toBeInTheDocument();
  });

  it('should open and close the Sidebar', async () => {
    render(<DashboardPage />);
    const sidebar = screen.getByTestId('sidebar');
    const openClass = 'opened';
    const closeClass = 'closed';

    // By default sidebar should be closed.
    expect(sidebar).toHaveClass(closeClass);

    // click open, then the sidebar should have opened class
    await userEvent.click(screen.getByTestId('sidebar-open-button'));
    expect(sidebar).toHaveClass(openClass);

    // click close, then the sidebar should have closed class
    await userEvent.click(screen.getByTestId('sidebar-close-button'));
    expect(sidebar).toHaveClass(closeClass);
  });
});
