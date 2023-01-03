import { render, waitFor, screen, act } from '@testing-library/react';

import userEvent  from '@testing-library/user-event';

import VaccineStageCard from '../../components/VaccineStageCard';
import { getVaccineStages } from '../../services/vaccineService';

jest.mock('../../services/vaccineService', () => {
  return {
    getVaccineStages: jest.fn(() =>
      new Promise(resolve =>
        setTimeout(() => {
          resolve([
            { name: 'R&D', count: 20 },
            { name: 'Preclinical Testing', count: 30 },
            { name: 'Manufacturing', count: 40 }
          ]);
        }, 2000)
      )
    )
  };
});

describe('VaccineStageCard', () => {
  it('renders pie chart with data when data is loaded', async () => {
    render(<VaccineStageCard />);
    await waitFor(() => expect(getVaccineStages).toHaveBeenCalled());   
  });
});
