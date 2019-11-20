export const apiUrl = 'v1/venue_events';

export default class VenueEventService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  retrieveVenueEvent(event) {
    return this.apiService.get(`${apiUrl}/${event}.json`);
  }
}
