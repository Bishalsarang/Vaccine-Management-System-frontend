import { render, screen } from '@testing-library/react';
import  userEvent  from '@testing-library/user-event';

import ConfirmationDialog from '../../components/ConfirmationDialog';

const { getByText } = screen;

describe('ConfirmationDialog', () => {
  it('should render the confirmation dialog with proper heading, buttons and actions', async () => {
    const onClose = jest.fn();
    const onAccept = jest.fn();
  
    userEvent.setup();
  
    render(
      <ConfirmationDialog
        isOpen={true}
        onClose={onClose}
        onAccept={onAccept}
        cancelButtonText="No"
        acceptButtontext="Yes"
        heading="Confirm action"
        message="Are you sure you want to perform this action?"
      />
    );
  
    // Test that the component renders the correct heading, message, and buttons
    expect(getByText('Confirm action')).toBeInTheDocument();
    expect(getByText('Are you sure you want to perform this action?')).toBeInTheDocument();
    expect(getByText('Yes')).toBeInTheDocument();
    expect(getByText('No')).toBeInTheDocument();
  
    // Test that clicking on the accept and cancel buttons calls the associated onAccept and onClose functions
    await userEvent.click(getByText('Yes'));
    expect(onAccept).toHaveBeenCalled();
    await userEvent.click(getByText('No'));
    expect(onClose).toHaveBeenCalled();
  });
})

