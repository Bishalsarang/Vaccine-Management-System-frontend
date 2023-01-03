import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import FabButton from '../../components/FabButton';

const { getByRole, getByText } = screen;

describe('FabButton', () => {
  beforeAll(() => {
    userEvent.setup();
  });

  it('renders the children and calls the onClick handler when clicked', async () => {
    const mockOnClick = jest.fn();

    render(
      <FabButton onClick={mockOnClick}>
        <span>Click To Add</span>
      </FabButton>,
    );

    const button = getByRole('button', {  name: /fab\-button/i});
    await userEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);

    expect(screen.getByText(/click to add/i)).toBeInTheDocument();
  });

  it('renders a tooltip with the provided message', async () => {
   const {debug} =  render(
      <FabButton tooltipMessage="Click me">
        <span>Test button</span>
      </FabButton>,
    );

    const button = getByRole('button', {  name: /fab\-button/i});
    await userEvent.hover(button);

    // We need to wait for some time for ttoltip to show up.
    await waitFor(() => getByText(/Click me/i));
 
    expect(getByText(/Click me/i)).toBeInTheDocument();
  });

  it('applies the provided styles to the Fab element', () => {
    render(
      <FabButton styles={{ backgroundColor: 'red' }}>
        <span>Test button</span>
      </FabButton>,
    );
    
    const button = getByRole('button', {  name: /fab\-button/i});
    expect(button).toHaveStyle('background-color: red');
  });
});
