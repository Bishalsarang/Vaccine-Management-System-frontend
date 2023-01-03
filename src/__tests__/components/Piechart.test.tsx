import { render, screen, waitFor } from '@testing-library/react';

import PieChartWrapper from '../../components/PieChart';

describe('PieChartWrapper', () => {
  it('renders loading skeleton when isLoading is true', () => {
    render(<PieChartWrapper isLoading />);
    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders pie chart when isLoading is false', () => {
    const data = [
      { name: 'Covid', value: 400 },
      { name: 'Malaria', value: 300 },
    ];
    render(<PieChartWrapper data={data} isLoading={false} />);

    waitFor(() => {
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    expect(screen.getByText(/covid/i)).toBeInTheDocument();
  });
});
