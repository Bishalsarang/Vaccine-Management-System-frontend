import * as Yup from 'yup';
import { VACCINE_STAGES } from '../constants/base.constants';
import { ERROR_MESSAGE } from '../utils/misc';

const CHARACTER_LIMIT_20 = 20;
const CHARACTER_LIMIT_255 = 255;
const CHARACTER_LIMIT_1000 = 1000;
const name = Yup.string()
  .required()
  .max(
    CHARACTER_LIMIT_20,
    ERROR_MESSAGE.MAX_LENGTH('name', CHARACTER_LIMIT_20),
  );

const description = Yup.string().max(
  CHARACTER_LIMIT_1000,
  ERROR_MESSAGE.MAX_LENGTH('description', CHARACTER_LIMIT_1000),
);

const companyName = Yup.string().max(
  CHARACTER_LIMIT_255,
  ERROR_MESSAGE.MAX_LENGTH('companyName', CHARACTER_LIMIT_255),
);

const numberOfDoses = Yup.number()
  .required()
  .positive(ERROR_MESSAGE.POSITIVE_INTEGERL('numberOfDoses'));

const isMandatory = Yup.boolean();
const stage = Yup.string().oneOf(Object.values(VACCINE_STAGES)).required();

const vaccineSchema = Yup.object({
  name,
  stage,
  description,
  isMandatory,
  companyName,
  numberOfDoses,
});

export { vaccineSchema };
