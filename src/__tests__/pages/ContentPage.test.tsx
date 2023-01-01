import { render, screen } from '@testing-library/react';

import ContentPage  from '../../pages/ContentPage';

jest.mock('../../pages/VaccinePage', () => {
  return () => <div data-testid="vaccine-page" />;
});

describe('ContentPage', () => {
  it('should render the Vaccine component', () => {
    render(<ContentPage />);
    expect(screen.getByTestId('vaccine-page')).toBeInTheDocument();
  });
});
