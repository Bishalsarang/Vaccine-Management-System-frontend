import { VACCINE_STAGES } from '../constants/base.constants';

// keyof operator extracts the keys of the VACCINE_STAGES object as a union of string literals.
export type VaccineStage = keyof typeof VACCINE_STAGES;

export interface CreateVaccinePayload {
  name: string;
  companyName?: string;
  description: string;
  numberOfDoses: number;
  isMandatory: boolean;
  stage: string & VaccineStage;
}

export interface Vaccine extends CreateVaccinePayload {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type PatchVaccinePayload = Partial<CreateVaccinePayload>;
