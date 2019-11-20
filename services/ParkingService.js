export const apiUrl = '/v1/parkings.json';

export default class ParkingService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  createSession(requestParams) {
    const params = {
      auth_token: requestParams.authToken,
      save_card: requestParams.saveCard,
      parking_time_type: requestParams.parkingTimeType,
      location_id: requestParams.locationId,
      vehicle_id: requestParams.vehicleId,
      promo_code: requestParams.promoCode,
      category: 'web',
      payment_method: {
        card_id: requestParams.cardId,
      },
      starts_at: requestParams.startsAt,
      apply_wallet_credit: requestParams.applyWalletCredit,
    };

    requestParams.minutes
      ? (params['minutes'] = requestParams.minutes)
      : (params['parking_time_rate_id'] = requestParams.parkingTimeRateId);
    return this.apiService.post(apiUrl, params);
  }

  createExtendedParkingTime(requestParams, activeSession) {
    const url = `/v1/parking_times/${activeSession.id}/extentions.json`;

    const params = {
      auth_token: requestParams.authToken,
      save_card: requestParams.saveCard,
      parking_time_type: requestParams.parkingTimeType,
      location_id: requestParams.locationId,
      vehicle_id: requestParams.vehicleId,
      promo_code: requestParams.promoCode,
      category: 'web',
      payment_method: {
        card_id: requestParams.cardId,
      },
      starts_at: requestParams.startsAt,
      apply_wallet_credit: requestParams.applyWalletCredit,
    };

    requestParams.minutes
      ? (params['minutes'] = requestParams.minutes)
      : (params['parking_time_rate_id'] = requestParams.parkingTimeRateId);
    return this.apiService.post(url, params);
  }

  createReservation(requestParams) {
    const params = {
      auth_token: requestParams.authToken,
      parking_time_type: requestParams.parkingTimeType,
      location_id: requestParams.locationId,
      vehicle_id: requestParams.vehicleId,
      promo_code: requestParams.promoCode,
      category: 'web',
      payment_method: {
        card_id: requestParams.cardId,
      },
      starts_at: requestParams.startsAt,
      ends_at: requestParams.endsAt,
      rate_group_id: requestParams.rateGroupId,
      receiver_email: requestParams.receiverEmail,
      receiver_phone: requestParams.receiverPhone,
      apply_wallet_credit: requestParams.applyWalletCredit,
    };

    return this.apiService.post(apiUrl, params);
  }

  createSubscription(requestParams) {
    const params = {
      auth_token: requestParams.authToken,
      parking_time_type: requestParams.parkingTimeType,
      parking_time_rate_id: requestParams.parkingTimeRateId,
      starts_at: requestParams.startsAt,
      vehicle_ids: requestParams.vehicleIds,
      promo_code: requestParams.promoCode,
      category: 'web',
    };

    return this.apiService.post(apiUrl, params);
  }
}
