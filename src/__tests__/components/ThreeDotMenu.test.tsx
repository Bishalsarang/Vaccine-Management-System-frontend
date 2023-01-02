import { render, screen} from '@testing-library/react';
import  userEvent  from '@testing-library/user-event';

import ThreeDotMenu from '../../components/ThreeDotMenu';

const menuItems = [
  { label: 'Edit', onClick: jest.fn() },
  { label: 'Delete', onClick: jest.fn() },
];

describe('ThreeDotMenu component', () => {
  it('should properly render the three dot menu and click.', async () => {
    render(<ThreeDotMenu menuItems={menuItems} />);
    userEvent.setup();
  
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  
    // Click on the Delete button
    await userEvent.click(screen.getByText('Delete'));
    expect(menuItems[1].onClick).toHaveBeenCalled();
    expect(menuItems[1].onClick).toHaveBeenCalledTimes(1);
  });
})

