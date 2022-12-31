import { Vaccine } from '../../interfaces/vaccineInterface';

/**
 * Represents the state of the vaccines in the application.
 *
 * @interface VaccineState
 */
export interface VaccineState {
  /**
   * Indicates whether the vaccine data is still being loaded.
   *
   * @type {boolean}
   */
  isLoading: boolean;

  /**
   * The list of vaccines.
   *
   * @type {Vaccine[]}
   */
  vaccines: Vaccine[];

  /**
   * The error message, if any.
   *
   * @type {(string|null)}
   */
  error: string | null;
}
