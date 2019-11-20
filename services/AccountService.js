import queries from 'config/queries';

export const apiUrl = '/v1/settings/';
export const paymentsUrl = '/v1/accounts/my/payment_methods';

export default class AccountService {
  constructor(apiService, apolloClient) {
    this.apiService = apiService;
    this.apolloClient = apolloClient;
  }

  updateProfile(requestParams) {
    const params = {
      auth_token: requestParams.authToken,
      profile: {
        first_name: requestParams.firstName,
        last_name: requestParams.lastName,
        email: requestParams.email,
        phone: requestParams.phone,
      },
    };

    return this.apiService.patch(apiUrl, params);
  }

  personalPaymentMethods() {
    return this.apolloClient.query({
      query: queries.GET_PROFILE_PAYMENT_METHODS_DATA,
    });
  }

  addCreditCard(authToken, stripeToken) {
    const params = {
      auth_token: authToken,
      stripe_token: stripeToken,
    };
    return this.apiService.post(paymentsUrl, params);
  }

  fetchSessions(authToken) {
    const url = `v1/sessions.json?auth_token=${authToken}`;
    return this.apiService.get(url);
  }
}
