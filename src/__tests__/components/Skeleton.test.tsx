import { render, screen } from '@testing-library/react';

import  Skeleton  from '../../components/Skeleton';

describe('SkeletonWrapper', () => {
  it('renders a Skeleton component', () => {
    render(<Skeleton />);

    const skeletonElement = screen.getByTestId('skeleton');

    expect(skeletonElement).toBeInTheDocument();
  });
});
