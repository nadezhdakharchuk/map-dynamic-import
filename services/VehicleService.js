export const apiUrl = `/v1/vehicles.json`;
export default class VehicleService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  fetchPersonalVehicles(authToken) {
    return this.apiService.get(`${apiUrl}?auth_token=${authToken}`);
  }

  addVehicle(params) {
    const requestParams = {
      auth_token: params.authToken,
      vehicle: {
        color: params.color,
        make: params.make,
        license_plate: params.licensePlate,
      },
    };
    return this.apiService.post(apiUrl, requestParams);
  }
}
