import ActionType from './ActionType';
import UploadStatus from '../../enums/UploadStatus';
import {
  StartUploadAction,
  ProgressUploadAction,
  CompleteUploadAction,
  FailUploadAction,
} from './actions';

export function startUpload(uploadId: string): StartUploadAction {
  return {
    type: ActionType.START_UPLOAD,
    uploadId,
  };
}

export function progressUpload(
  uploadId: string,
  status: UploadStatus,
  progress: number,
): ProgressUploadAction {
  return {
    type: ActionType.PROGRESS_UPLOAD,
    uploadId,
    progress,
    status,
  };
}

export function completeUpload(uploadId: string): CompleteUploadAction {
  return {
    type: ActionType.COMPLETE_UPLOAD,
    uploadId,
  };
}

export function failUpload(uploadId: string, error: Error): FailUploadAction {
  return {
    type: ActionType.FAIL_UPLOAD,
    uploadId,
    error,
  };
}
