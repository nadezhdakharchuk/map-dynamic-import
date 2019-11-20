import queries from 'config/queries';
import { SIGNIN } from 'config/mutations';

export default class AuthorizationService {
  constructor(apiService, apolloClient) {
    this.apiService = apiService;
    this.apolloClient = apolloClient;
  }

  fetchCurrentProfile() {
    return this.apolloClient
      .query({
        fetchPolicy: 'no-cache',
        query: queries.GET_CURRENT_PROFILE_DATA,
      })
      .then(({ data }) => {
        return { currentProfile: data.me };
      })
      .catch(error => {
        return { currentProfile: null };
      });
  }

  getSigninInfo(login) {
    return this.apolloClient.query({
      fetchPolicy: 'no-cache',
      query: queries.GET_LOGIN_INFO,
      variables: { login: login },
    });
  }

  getVerifyCode(phone) {
    const body = { phone };
    return this.apiService.post('/v1/verification_codes', body);
  }

  verifyPhone(phone, code) {
    const body = {
      phone,
      code,
    };
    return this.apiService.post('/v1/phone_verifications', body);
  }

  signin(login, password) {
    return this.apolloClient.mutate({
      mutation: SIGNIN,
      variables: { login: login, password: password },
    });
  }

  forgotPassword(login) {
    const body = {
      login,
    };

    return this.apiService.post('/v1/forgot_passwords.json', body);
  }

  resetPassword(token, password) {
    const body = {
      password_reset_token: token,
      new_password: password,
    };

    return this.apiService.post('/v1/reset_passwords.json', body);
  }

  signUp(email, password) {
    const body = {
      profile: {
        login: email,
        password,
      },
    };

    return this.apiService.post('/v1/signup', body);
  }
}
