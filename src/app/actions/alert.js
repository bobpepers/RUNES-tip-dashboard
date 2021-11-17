import {
  REMOVE_SNACKBAR,
} from './types/index';

export const removeSnackbar = (key) => ({
  type: REMOVE_SNACKBAR,
  key,
});
