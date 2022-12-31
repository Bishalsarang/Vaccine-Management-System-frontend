import { CONTENT_TYPE } from './../constants/http.constants';

import { axiosInstance } from '../utils/http';
import { interpolate } from '../utils/string';

import {
  Vaccine,
  PatchVaccinePayload,
  CreateVaccinePayload,
} from '../interfaces/vaccineInterface';

import {
  VACCINES,
  VACCINES_ID,
  VACCINES_STAGES,
  VACCINES_ALLERGIES,
} from '../constants/endpoints.constants';

export interface FieldCountWrapper {
  name: string;
  count: number;
}

/**
 * Get a list of vaccines.
 *
 * @returns { Promise<Vaccine[]> } A promise that resolves to the list of vaccines.
 */
export async function getVaccines(): Promise<Vaccine[]> {
  const vaccines = await axiosInstance.get<Vaccine[], Vaccine[]>(VACCINES);

  return vaccines;
}

/**
 * Create a new vaccine.
 *
 * @param {CreateVaccinePayload} payload - The payload containing the data for the new vaccine.
 * @returns {Promise<any>} A promise that resolves to the newly created vaccine.
 */
export async function createVaccine(
  payload: CreateVaccinePayload,
): Promise<Vaccine> {
  // Axios automatically handles serializing the payload to formData.
  // So we don't have to manually create the formData

  const vaccines = await axiosInstance.post<Vaccine, Vaccine>(
    VACCINES,
    payload,
    {
      headers: {
        [CONTENT_TYPE.KEY]: CONTENT_TYPE.MULTIPART_FORM_DATA,
      },
    },
  );

  return vaccines;
}

/**
 * Update an existing vaccine.
 *
 * @param {PatchVaccinePayload} payload - The payload containing the updated data for the vaccine.
 * @returns {Promise<any>} A promise that resolves to the updated vaccine.
 */
export async function updateVaccine(
  id: number,
  payload: PatchVaccinePayload,
): Promise<Vaccine> {
  const url = interpolate(VACCINES_ID, { id });

  // Axios automatically handles serializing the payload to formData.
  const vaccines = await axiosInstance.patch<Vaccine, Vaccine>(url, payload, {
    headers: {
      [CONTENT_TYPE.KEY]: CONTENT_TYPE.MULTIPART_FORM_DATA,
    },
  });

  return vaccines;
}

/**
 * Delete an existing vaccine from the server.
 *
 * @param {string} id - The ID of the vaccine to delete.
 * @returns {Promise<any>} A promise that resolves to the response from the server.
 */
export async function deleteVaccine(id: number): Promise<any> {
  const url = interpolate(VACCINES_ID, { id });

  const response = await axiosInstance.delete(url);

  return response;
}

/**
 * Gets the vaccine stages.
 *
 * @returns
 */
export async function getVaccineStages(): Promise<FieldCountWrapper[]> {
  const response = await axiosInstance.get<
    FieldCountWrapper[],
    FieldCountWrapper[]
  >(VACCINES_STAGES);

  return response;
}

/**
 * Gets the vaccine allergies
 *
 * @returns
 */
export async function getAllergies(): Promise<FieldCountWrapper[]> {
  const response = await axiosInstance.get<
    FieldCountWrapper[],
    FieldCountWrapper[]
  >(VACCINES_ALLERGIES);

  return response;
}
