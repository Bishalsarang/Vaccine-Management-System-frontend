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
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export type PatchVaccinePayload = Partial<CreateVaccinePayload>;
