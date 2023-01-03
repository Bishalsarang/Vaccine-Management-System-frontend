import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DialogWrapper from '../../components/Dialog';

describe('DialogWrapper', () => {
  it('should render the dialog', () => {
    render(
      <DialogWrapper open={true} heading="My Dialog">
        <div>My Contents</div>
      </DialogWrapper>,
    );

    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.getByText('My Dialog')).toBeInTheDocument();

    // Check that the content is displayed
    expect(screen.getByText('My Contents')).toBeInTheDocument();

    // Check that the label for default cancel button is shown.
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

    // Check that the accept button is displayed
    expect(screen.getByRole('button', { name: /accept/i })).toBeInTheDocument();
  });

  it('It should not render the dialog if open is false', () => {
    render(
      <DialogWrapper open={false} heading="Heading">
        <div>Content</div>
      </DialogWrapper>,
    );

    expect(screen.queryByTestId('dialog')).toBeNull();
  });

  it('should render the loading spinner if isLoading is true', () => {
    render(
      <DialogWrapper
        open
        isLoading
        heading="Heading"
      >
        <div>Content</div>
      </DialogWrapper>,
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should render the custom accept button text if provided', () => {
    // Render the dialog
    render(
      <DialogWrapper
        open
        heading="Heading"
        cancelButtonText="no"
        acceptButtonText="okay"
      >
        <div>Content</div>
      </DialogWrapper>,
    );

   expect(screen.getByRole('button', { name: /okay/i })).toBeInTheDocument();

   expect(screen.getByRole('button', { name: /no/i })).toBeInTheDocument();
  });


  it('should call onAccept when the accept button is clicked and onClose for the OnClose', async () => {
    // Mock the onAccept function
    const onAcceptMock = jest.fn();
    const onCancelMock = jest.fn();

    // Render the dialog
    render(
      <DialogWrapper
        open
        heading="Heading"
        onClose={onCancelMock}
        onAccept={onAcceptMock}
      >
        <div>Content</div>
      </DialogWrapper>
    );

    userEvent.setup();
    const acceptButton = screen.getByRole('button', { name: /accept/i });
    await userEvent.click(acceptButton);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(onAcceptMock).toHaveBeenCalled();
    expect(onCancelMock).toHaveBeenCalled();

    // Check that onAccept was called
    expect(onAcceptMock).toHaveBeenCalledTimes(1);
  });
});
