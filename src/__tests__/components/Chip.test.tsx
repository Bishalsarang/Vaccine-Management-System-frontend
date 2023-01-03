
import { render, screen } from '@testing-library/react';

import Chip from '../../components/Chip';

describe('ChipWrapper', () => {
  it('should render a chip with the given label', () => {
    // Render the chip
    render(<Chip label="allergey" />);

    expect(screen.getByText(/allergey/i)).toBeInTheDocument();
  });
});
