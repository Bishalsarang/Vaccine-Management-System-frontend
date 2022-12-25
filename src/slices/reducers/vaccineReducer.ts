import { Vaccine } from '../../interfaces/vaccine.interface';

export interface VaccineState {
  vaccine: Vaccine | null;
  isLoading: boolean;
  vaccines: Vaccine[];
  error: string | null;
}
