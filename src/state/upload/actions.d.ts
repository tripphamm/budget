import ActionType from './ActionType';
import UploadStatus from '../../enums/UploadStatus';

type AnyUploadAction =
  | StartUploadAction
  | ProgressUploadAction
  | CompleteUploadAction
  | FailUploadAction;

interface StartUploadAction {
  type: ActionType.START_UPLOAD;
  uploadId: string;
}

interface ProgressUploadAction {
  type: ActionType.PROGRESS_UPLOAD;
  uploadId: string;
  progress: number;
  status: UploadStatus;
}

interface CompleteUploadAction {
  type: ActionType.COMPLETE_UPLOAD;
  uploadId: string;
}

interface FailUploadAction {
  type: ActionType.FAIL_UPLOAD;
  uploadId: string;
  error: Error;
}
