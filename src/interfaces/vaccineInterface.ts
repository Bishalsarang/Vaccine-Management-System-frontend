import { VACCINE_STAGES } from '../constants/base.constants';

export type VaccineStage = typeof VACCINE_STAGES[keyof typeof VACCINE_STAGES];

/**
 * CreateVaccinePayload interface.
 *
 * @property {string} [name] - The name of the vaccine.
 * @property {string} [companyName] - The name of the company that manufactures the vaccine.
 * @property {string} [description] - A description of the vaccine.
 * @property {number} [numberOfDoses] - The number of doses required for the vaccine.
 * @property {boolean} [isMandatory] - Whether the vaccine is mandatory or not.
 * @property {string} [stage] - The stage of development of the vaccine.
 */
export interface CreateVaccinePayload {
  name: string;
  companyName?: string;
  description?: string;
  numberOfDoses: number;
  isMandatory: boolean;
  stage: VaccineStage;
  allergies: string[];
  image: null | File;
  imageUrl: null | string;
}

/**
 * CreateVaccinePayload interface.
 *
 * @property {number} [id] - The id of the Vaccine
 * @property {string} [createdAt] - The date when vaccine is created.
 * @property {string} [updatedAt] - The date when vaccine is updated.
 * @property {number} [deletedAt] - The date when vaccine is deleted.
 */
export interface Vaccine extends CreateVaccinePayload {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface PatchVaccinePayload extends Partial<CreateVaccinePayload> {
  id: number;
}
