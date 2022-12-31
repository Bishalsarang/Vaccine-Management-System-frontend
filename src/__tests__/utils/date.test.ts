import { formateDateToShort } from '../../utils/date';

describe('formateDateToShort', () => {
  it('should format the date string in MM-DD-YYYY to a short form', () => {
    const dateString = '12-31-2022';
    const expectedFormattedDate = 'December 31, 2022';

    const formattedDate = formateDateToShort(dateString);
    expect(formattedDate).toEqual(expectedFormattedDate);
  });

  it('should format the date string to  YYYY-MM-DD to a short form', () => {
    const dateString = '2022-12-31';
    const expectedFormattedDate = 'December 31, 2022';

    const formattedDate = formateDateToShort(dateString);
    expect(formattedDate).toEqual(expectedFormattedDate);
  });


  it('should not format an invalid date string', () => {
    const dateString = 'invalid';
    const expectedFormattedDate = 'Invalid Date';

    const formattedDate = formateDateToShort(dateString);
    expect(formattedDate).toEqual(expectedFormattedDate);
  });
});
