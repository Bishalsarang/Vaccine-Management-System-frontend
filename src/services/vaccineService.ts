import { axiosInstance } from '../utils/axios';
import { interpolate } from '../utils/string';

import {
  Vaccine,
  PatchVaccinePayload,
  CreateVaccinePayload,
} from '../interfaces/vaccineInterface';

import {
  VACCINES,
  VACCINES_ALLERGIES,
  VACCINES_ID,
  VACCINES_STAGES,
} from '../constants/endpoints.constants';

//TODO: Convert any type to appropriate interface.

/**
 * Get a list of vaccines.
 *
 * @returns { Promise<Vaccine[]> } A promise that resolves to the list of vaccines.
 */
export async function getVaccines(): Promise<Vaccine[]> {
  const vaccines = await axiosInstance.get<any, Vaccine[]>(VACCINES);
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
  const vaccines = await axiosInstance.post<any, Vaccine>(VACCINES, payload);

  return vaccines;
}

/**
 * Update an existing vaccine.
 *
 * @param {PatchVaccinePayload} patchPayload - The payload containing the updated data for the vaccine.
 * @returns {Promise<any>} A promise that resolves to the updated vaccine.
 */
export async function updateVaccine(
  id: number,
  patchPayload: PatchVaccinePayload,
): Promise<Vaccine> {
  const url = interpolate(VACCINES_ID, { id });

  const vaccines = await axiosInstance.patch<any, Vaccine>(url, patchPayload);

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

export interface FieldCountWrapper {
  name: string;
  count: number;
}

/**
 * Gets the vaccine stages
 *
 * @returns
 */
export async function getVaccineStages(): Promise<FieldCountWrapper[]> {
  const response = await axiosInstance.get<any, FieldCountWrapper[]>(
    VACCINES_STAGES,
  );

  return response;
}

/**
 * Gets the vaccine alergies
 *
 * @returns
 */
export async function getAllergies(): Promise<FieldCountWrapper[]> {
  const response = await axiosInstance.get<any, FieldCountWrapper[]>(
    VACCINES_ALLERGIES,
  );

  return response;
}
