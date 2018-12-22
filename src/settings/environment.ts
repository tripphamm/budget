import Environment from '../enums/Environment';

export function getEnvironment() {
  const url = new URL(window.location.toString());

  if (url.hostname === 'localhost') {
    return Environment.DEVELOPMENT;
  }

  return Environment.PRODUCTION;
}
