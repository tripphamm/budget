import ActionType from './ActionType';
import { UploadState } from './state';
import initialState from './initialState';
import { AnyUploadAction } from './actions';
import UploadStatus from '../../enums/UploadStatus';

export default (state: UploadState = initialState, action: AnyUploadAction): UploadState => {
  switch (action.type) {
    case ActionType.START_UPLOAD:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.uploadId]: {
            progress: 0,
            status: UploadStatus.RUNNING,
          },
        },
      };
    case ActionType.PROGRESS_UPLOAD:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.uploadId]: {
            progress: action.progress,
            status: action.status,
          },
        },
      };
    case ActionType.COMPLETE_UPLOAD:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.uploadId]: {
            progress: 100,
            status: UploadStatus.COMPLETED,
          },
        },
      };
    case ActionType.FAIL_UPLOAD:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.uploadId]: {
            ...state.uploads[action.uploadId],
            status: UploadStatus.FAILED,
            error: action.error,
          },
        },
      };
    default:
      return state;
  }
};
