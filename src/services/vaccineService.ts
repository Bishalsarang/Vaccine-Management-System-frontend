import { axiosInstance } from '../utils/axios';
import { interpolate } from '../utils/string';

import {
  Vaccine,
  PatchVaccinePayload,
  CreateVaccinePayload,
} from '../interfaces/vaccine.interface';

import { VACCINES, VACCINES_ID } from '../constants/endpoints.constants';

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
  patchPayload: PatchVaccinePayload,
): Promise<Vaccine> {
  const vaccines = await axiosInstance.patch<any, Vaccine>(
    VACCINES,
    patchPayload,
  );

  return vaccines;
}

/**
 * Delete an existing vaccine from the server.
 *
 * @param {string} id - The ID of the vaccine to delete.
 * @returns {Promise<any>} A promise that resolves to the response from the server.
 */
export async function deleteVaccine(id: string): Promise<any> {
  const url = interpolate(VACCINES_ID, { id });

  const response = await axiosInstance.delete(url);

  return response;
}
