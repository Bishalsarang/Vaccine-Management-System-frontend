import { render, screen } from '@testing-library/react';

import  Button  from '../../components/Button';

describe('Button', () => {
  it('should render the button with the given label', () => {
    // Render the button
    render(
      <Button label="Button label">
        <div>Content</div>
      </Button>
    );

    // Check that the button has the correct label
    expect(screen.getByText('Button label')).toBeInTheDocument();
  });

  it('should render the loading spinner if isLoading is true', () => {
    // Render the button
    render(
      <Button label="Button label" isLoading>
        <div>Content</div>
      </Button>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should call onClick when the button is clicked', () => {
    const onClickMock = jest.fn();

    render(
      <Button label="Click Me" onClick={onClickMock}>
        <div>Content</div>
      </Button>
    );

    screen.getByText('Click Me').click();

    // Check that onClick was called
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
