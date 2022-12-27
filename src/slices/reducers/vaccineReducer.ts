import { Vaccine } from '../../interfaces/vaccine.interface';

export interface VaccineState {
  isLoading: boolean;
  vaccines: Vaccine[];
  error: string | null;
}
