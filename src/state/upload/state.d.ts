import { BudgeUpload } from '../../budge-app-env';

interface UploadState {
  uploads: {
    [id: string]: BudgeUpload;
  };
}
