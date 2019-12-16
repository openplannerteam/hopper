/* eslint import/prefer-default-export: 0 */

export const makeBuildPath = (url: string) => (route: string) => {
  const path = url.endsWith('/') ? url.slice(0, url.length - 1) : url;
  return `${path}/${route}`;
};
