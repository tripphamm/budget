import { default as createUuid } from 'uuid/v4';

import { startUpload, progressUpload, completeUpload, failUpload } from '../state/actionCreators';
import UploadState from '../enums/UploadState';

import { storage } from './firebaseService';
import { getGoogleCloudStorageBucket } from '../settings/hosts';
import { getStore } from '../state/store';

type UploadableObject = Blob | Uint8Array | ArrayBuffer;

const storageRef = storage.refFromURL(getGoogleCloudStorageBucket());

export function upload(file: UploadableObject, options = { uploadId: createUuid() }) {
  const store = getStore();
  const dispatch = store.dispatch;

  const { uploadId } = options;
  const ref = storageRef.child(uploadId);

  const uploadTask = ref.put(file);

  dispatch(startUpload(uploadId));

  uploadTask.on(
    'state_changed',
    snapshot => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      switch (snapshot.state) {
        case 'paused':
          dispatch(progressUpload(uploadId, UploadState.PAUSED, progress));
          break;
        case 'running':
          dispatch(progressUpload(uploadId, UploadState.RUNNING, progress));
          break;
        default:
          throw new Error(`Upload state ${snapshot.state} was not recognized`);
      }
    },
    error => {
      dispatch(failUpload(uploadId, error));
    },
    () => {
      dispatch(completeUpload(uploadId));
    },
  );

  return uploadId;
}

export function uploadFromURL(url: string) {
  const uploadId = createUuid();

  const rehostFile = async () => {
    const response = await fetch(url);
    const blob = await response.blob();

    return upload(blob, { uploadId });
  };

  rehostFile();

  return uploadId;
}

export function deleteUpload(url: string) {
  const ref = storage.refFromURL(url);

  ref.delete();
}

export async function getURL(uploadId: string) {
  return await storage.ref(`${uploadId}`).getDownloadURL();
}
