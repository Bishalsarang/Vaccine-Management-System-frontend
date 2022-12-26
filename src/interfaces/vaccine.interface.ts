export interface CreateVaccinePayload {
  name: string;
  companyEmail?: string;
  companyContact?: string;
  description: string;
  numberOfDoses: number;
  isMandatory: boolean;
}

export interface Vaccine extends CreateVaccinePayload {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export type PatchVaccinePayload = Partial<CreateVaccinePayload>;
