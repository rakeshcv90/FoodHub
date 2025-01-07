import API from './API';
import {RequestAPI} from './RequestAPI';

const debounce = <T extends (...args: any[]) => Promise<any>>(
  func: T,
  defaultDelay: number
) => {
  let debounceTimer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve, reject) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        func(...args)
          .then(resolve) // Resolve the promise returned by the function
          .catch(reject); // Reject the promise if the function fails
      }, defaultDelay);
    });
  };
};


const reverseGeoCodeAPI = debounce((latitude: number, longitude: number) => {
  return new Promise((resolve, reject) =>
    RequestAPI.makeRequest(
      'GET',
      // API.GEO_CODE+`?latlng=${latitude}${longitude},`,
      API.GEO_CODE,
      {
        latlng: latitude + ' ' + longitude,
      },
      ({data, errors, status, message}) => {
        if (data) {
          // console.log(data.results[0]);
          resolve(data?.results[0]?.formatted_address);
        } else {
          reject('');
        }
      },
    ),
  );
}, 300);

const geoCodeAPI = debounce((place_id: string) => {
  return new Promise((resolve, reject) =>
    RequestAPI.makeRequest(
      'GET',
      API.GEO_CODE,
      {
        place_id,
      },
      ({data, errors, status, message}) => {
        if (status) {
          console.log(data?.results[0], 'ADDER COOR');
          resolve(data?.results[0]?.geometry?.location)
        } else {
          reject('ERROR')
          // console.log('ERRR', data, errors);
        }
      },
    ),
  );
}, 300);

const placesPredictionsAPI = debounce((input: string) => {
  return new Promise((resolve, reject) =>
    RequestAPI.makeRequest(
      'GET',
      API.AUTO_COMPLETE,
      {
        input,
        radius: 20,
      },
      ({data, errors, status, message}) => {
        if (status) {
          resolve(data?.predictions);
        } else {
          reject('ERROR');
        }
      },
    ),
  );
}, 300);

const API_CALLS = {
  reverseGeoCodeAPI,
  geoCodeAPI,
  placesPredictionsAPI
};

export default API_CALLS;
