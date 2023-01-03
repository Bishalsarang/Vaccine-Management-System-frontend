import {
  VACCINES,
  VACCINES_ALLERGIES,
  VACCINES_ID,
  VACCINES_STAGES,
} from '../../constants/endpointsConstants';
import { CONTENT_TYPE } from '../../constants/httpConstants';

import {
  createVaccine,
  deleteVaccine,
  getAllergies,
  getVaccines,
  getVaccineStages,
  updateVaccine,
} from '../../services/vaccineService';

import { axiosInstance } from '../../utils/http';
import { interpolate } from '../../utils/string';

describe('getVaccines', () => {
  it('should return a list of vaccines', async () => {
    const mockVaccines = [
      { id: 1, name: 'Covid vaccine' },
      { id: 2, name: 'Tetanus Vaccine' },
    ];

    jest.spyOn(axiosInstance, 'get').mockResolvedValue(mockVaccines);

    const result = await getVaccines();

    // assert if the service is returni
    expect(result).toEqual(mockVaccines);
    expect(axiosInstance.get).toHaveBeenCalledWith(VACCINES);
  });

  it('should throw an error if the API request fails', async () => {
    jest
      .spyOn(axiosInstance, 'get')
      .mockRejectedValue(new Error('API request failed'));

    const result = getVaccines();

    await expect(result).rejects.toThrowError('API request failed');

    // check if the axios has been called with proper URL
    expect(axiosInstance.get).toHaveBeenCalledWith(VACCINES);
  });
});

describe('createVaccine', () => {
  it('should create a new vaccine', async () => {
    const mockVaccinePayload = {
      image: null,
      deletedAt: null,
      numberOfDoses: 2,
      isMandatory: true,
      companyName: 'Pfizer',
      stage: 'Manufacturing',
      name: 'COVID-19 Vaccine',
      createdAt: '2022-12-27 17:16:01.466006',
      updatedAt: '2022-12-30 09:43:25.600149',
      allergies: ['Nausea', 'Fever', 'Rashes'],
      description: 'Vaccine for preventing COVID-19',
    };

    const mockVaccine = { id: 1, ...mockVaccinePayload };
    jest.spyOn(axiosInstance, 'post').mockResolvedValue(mockVaccine);

    const result = await createVaccine(mockVaccinePayload);
    expect(result).toEqual(mockVaccine);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      VACCINES,
      mockVaccinePayload,
      {
        headers: {
          [CONTENT_TYPE.KEY]: CONTENT_TYPE.MULTIPART_FORM_DATA,
        },
      },
    );
  });
});

describe('updateVaccine', () => {
  it('should update existing vaccine', async () => {
    const mockVaccinePayload = {
      id: 1,
      image: null,
      deletedAt: null,
      numberOfDoses: 2,
      isMandatory: true,
      companyName: 'Pfizer',
      stage: 'Manufacturing',
      name: 'COVID-19 Vaccine',
      createdAt: '2022-12-27 17:16:01.466006',
      updatedAt: '2022-12-30 09:43:25.600149',
      allergies: ['Nausea', 'Fever', 'Rashes'],
      description: 'Vaccine for preventing COVID-19',
    };

    const mockVaccine = { ...mockVaccinePayload };
    jest.spyOn(axiosInstance, 'patch').mockResolvedValue(mockVaccine);

    const result = await updateVaccine(
      mockVaccinePayload.id,
      mockVaccinePayload,
    );
    expect(result).toEqual(mockVaccine);
    const url = interpolate(VACCINES_ID, { id: mockVaccinePayload.id });

    expect(axiosInstance.patch).toHaveBeenCalledWith(url, mockVaccinePayload, {
      headers: {
        [CONTENT_TYPE.KEY]: CONTENT_TYPE.MULTIPART_FORM_DATA,
      },
    });
  });
});

describe('deleteVaccine', () => {
  it('should delete a vaccine', async () => {
    const mockId = 1;
    jest
      .spyOn(axiosInstance, 'delete')
      .mockResolvedValue({ message: 'Vaccine deleted succesfully' });

    const result = await deleteVaccine(mockId);

    expect(result).toEqual({ message: 'Vaccine deleted succesfully' });

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      interpolate(VACCINES_ID, { id: mockId }),
    );
  });
});

describe('getVaccineStages', () => {
  it('should return a list of vaccine stages', async () => {
    const mockStages = [
      { field: 'Clinical trials', count: 10 },
      { field: 'Research', count: 5 },
    ];
    jest.spyOn(axiosInstance, 'get').mockResolvedValue(mockStages);

    const result = await getVaccineStages();

    expect(result).toEqual(mockStages);
    expect(axiosInstance.get).toHaveBeenCalledWith(VACCINES_STAGES);
  });
});

describe('getAllergies', () => {
  it('should return a list of side-effects or allergies with the count', async () => {
    const mockAllergies = [
      { field: 'Fever', count: 10 },
      { field: 'Nausea', count: 25 },
    ];
    jest.spyOn(axiosInstance, 'get').mockResolvedValue(mockAllergies);

    const result = await getAllergies();

    expect(result).toEqual(mockAllergies);
    expect(axiosInstance.get).toHaveBeenCalledWith(VACCINES_ALLERGIES);
  });
});
