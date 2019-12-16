import HttpClient from './httpClient';
import config from '../config';

const autocomplete = (query) => new Promise(
  (resolve, reject) => HttpClient.get(config.autoCompleteURL + query).then(res => {
    const { features } = res.data;
    if (!features) return [];
    return resolve(features.map(feature => {
      return {
        name: `${feature.properties.name}, ${feature.properties.localadmin || feature.properties.region}`,
        coords: {
          lon: feature.geometry.coordinates[0],
          lat: feature.geometry.coordinates[1],
        },
      };
    }));
  }).catch(err => reject(err)),
);

export default autocomplete;
