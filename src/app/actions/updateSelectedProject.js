import { UPDATE_SELECTED_PROJECT } from './types';

export function updateSelectedProject(currentProject) {
  return {
    type: UPDATE_SELECTED_PROJECT,
    payload: currentProject,
  };
}
