import { Vaccine } from '../../interfaces/vaccineInterface';

export interface VaccineState {
  isLoading: boolean;
  vaccines: Vaccine[];
  error: string | null;
}
