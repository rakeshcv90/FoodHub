import {GOOGLE_MAPS_URL} from './urls';

const API = {
  AUTO_COMPLETE: GOOGLE_MAPS_URL + '/place/autocomplete/json',
  QUERY_AUTO_COMPLETE: GOOGLE_MAPS_URL + '/place/queryautocomplete/json',
  DIRECTIONS: GOOGLE_MAPS_URL + '/directions/json',
  GEO_CODE: GOOGLE_MAPS_URL + '/geocode/json',
};

export default API
