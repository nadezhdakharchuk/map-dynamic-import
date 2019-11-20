export const apiUrl = '/v1/venues';

export default class VenueService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  retrieveVenue(slug) {
    return this.apiService.get(`${apiUrl}/${slug}.json`);
  }

  fetchUpcomingEvents(venueId) {
    const body = {
      params: {
        venue_id: venueId,
        status: 'upcoming',
      },
    };

    return this.apiService.get(`/v1/venue_events.json`, body);
  }
}
