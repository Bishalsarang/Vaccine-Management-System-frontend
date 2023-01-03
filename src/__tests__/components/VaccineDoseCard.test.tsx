import { screen } from '@testing-library/react';

import VaccineDoseCard from '../../components/VaccineDoseCard';
import { renderWithProviders } from '../../utils/test-utils';

const { getByText } = screen;

test('VaccineDoseCard renders correctly', () => {
  renderWithProviders(<VaccineDoseCard />);

  expect(getByText(/vaccine doses/i)).toBeInTheDocument();
  expect(getByText(/number of doses/i)).toBeInTheDocument();

  // should render the legend correctly.
  expect(getByText(/ismandatory/i)).toBeInTheDocument();
  expect(getByText(/optional/i)).toBeInTheDocument();
});
