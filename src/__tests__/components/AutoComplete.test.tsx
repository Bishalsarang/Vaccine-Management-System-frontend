import { render, screen, fireEvent } from '@testing-library/react';
import  userEvent  from '@testing-library/user-event';

import AutoComplete  from '../../components/AutoComplete';

describe('AutoCompleteWrapper', () => {
  it('should add a new option after typing the option and pressing enter', async () => {
    const setOptions = jest.fn();
    const setSelectedOptions = jest.fn();
  
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const selectedOptions = ['Option 1'];
  
    render(
      <AutoComplete
        label="My Dropdown"
        options={options}
        setOptions={setOptions}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    );
    
    // get the input box.
    const input = screen.getByRole('combobox', {  name: /My Dropdown/i});
    
    // type 'Option 4' in the box
    await userEvent.type(input, 'Option 4');
    expect(input).toHaveValue('Option 4');
  
    // press 'Enter' to add that
    await userEvent.type(input, '{enter}');
    await userEvent.click(document.body);
  
    // verify that after prressing enter the callback 'setSelectedOptions' and 'setOptions' are called with appropriate params.
    expect(setSelectedOptions).toHaveBeenCalledWith([...selectedOptions, 'Option 4']);
    expect(setOptions).toHaveBeenCalledWith([...options, 'Option 4']);
  });

  it('should render tags for selected options', async () => {
    // TODO: Add test
  });

  it('should delete the chips when clicked on cross icon for chip ', async () => {
    // TODO: Add test
  });

  it('should delete the options from selected options when clicked on the selected option.', async () => {
    // TODO: Add test
  });
})

