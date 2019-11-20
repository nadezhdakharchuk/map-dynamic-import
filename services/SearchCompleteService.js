import paramsSerializer from '../utils/paramsSerializer';

export const apiUrl = `/v1/search.json`;

export default class SearchCompleteService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  fetchSearchItems(keywords) {
    return this.apiService.get(`${apiUrl}?query=${keywords}&with_street_address=true`);
  }

  fetchLocations(latitude, longitude, radius, features = null) {
    return this.apiService.get('/v1/locations.json', {
      params: { latitude, longitude, radius, feature_ids: [...features] },
      paramsSerializer,
    });
  }
}
