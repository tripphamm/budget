import { getEnvironment } from './environment';
import Environment from '../enums/Environment';

export function getGoogleCloudStorageBucket() {
  const env = getEnvironment();

  switch (env) {
    case Environment.DEVELOPMENT:
    case Environment.PRODUCTION:
      return 'gs://budge-123bb.appspot.com';
    default:
      throw new Error(`Unrecognized Environment: ${env}. Check Environments enum.`);
  }
}
