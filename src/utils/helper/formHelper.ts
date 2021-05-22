import { MIN_NAME_LENGTH } from '../constants';

export const COMMON_INPUT_VALIDATION = {
  minLength: {
    value: MIN_NAME_LENGTH,
    message: `Minimum length should be ${MIN_NAME_LENGTH}.`,
  },
};
