import queries from 'config/queries';

export const apiUrl = 'v1/locations';
export const parkingCostUrl = '/v1/parking_cost';

export default class LocationService {
  constructor(apiService, apolloClient) {
    this.apiService = apiService;
    this.apolloClient = apolloClient;
  }

  fetchLocations() {
    return this.apiService.get(`${apiUrl}.json`);
  }

  fetchLocation(name) {
    return this.apolloClient
      .query({
        query: queries.GET_LOCATION_PAGE_DATA,
        variables: { name: name },
      })
      .then(({ data }) => {
        return { location: data.location };
      })
      .catch(error => {
        console.log('fetchLocation ERROR', error);
        return { location: null };
      });
  }

  fetchFeatures(id) {
    return this.apiService.get(`${apiUrl}/${id}/features.json`);
  }

  fetchReoccurringRates(id) {
    return this.apiService.get(`${apiUrl}/${id}/reoccurring_rates.json`);
  }

  fetchRates(id) {
    return this.apiService.get(`${apiUrl}/${id}/rates.json`);
  }

  fetchNearbyDestinations(id) {
    return this.apiService.get(`${apiUrl}/${id}/nearby_destinations.json`);
  }

  fetchParkingCostWithCustomDuration(fetchParkingCostParams) {
    const params = {
      params: {
        auth_token: fetchParkingCostParams.authToken || '',
        parking_time_type: fetchParkingCostParams.parkingTimeType,
        location_id: fetchParkingCostParams.locationId,
        vehicle_id: fetchParkingCostParams.vehicleId,
        starts_at: fetchParkingCostParams.startsAt,
        ends_at: fetchParkingCostParams.endsAt,
        promo_code: fetchParkingCostParams.promoCode || '',
        apply_wallet_credit: fetchParkingCostParams.applyWalletCredit,
      },
    };

    return this.apiService.get(parkingCostUrl, params);
  }

  fetchParkingCostWithCustomRate(fetchParkingCostParams) {
    const params = {
      params: {
        auth_token: fetchParkingCostParams.authToken || '',
        vehicle_id: fetchParkingCostParams.vehicleId,
        parking_time_type: fetchParkingCostParams.parkingTimeType,
        location_id: fetchParkingCostParams.locationId,
        parking_time_rate_id: fetchParkingCostParams.parkingTimeRateId,
        promo_code: fetchParkingCostParams.promoCode || '',
        apply_wallet_credit: fetchParkingCostParams.applyWalletCredit,
      },
    };

    return this.apiService.get(parkingCostUrl, params);
  }

  fetchAllFeatures() {
    return this.apiService.get('v1/features.json');
  }
}
