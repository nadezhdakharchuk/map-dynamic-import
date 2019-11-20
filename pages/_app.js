import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from 'static/styles/globalStyles';
import theme from 'static/styles/theme';

import { withApolloClient } from 'lib/withApolloClient';
import withApiService from 'lib/withApiService';
import AuthorizationService from 'services/AuthorizationService';
import AccountService from 'services/AccountService';
import VehicleService from 'services/VehicleService';

import AuthorizationProvider from 'contexts/AuthorizationContext/AuthorizationProvider';
import AccountProvider from 'contexts/AccountContext/AccountProvider';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class MyApp extends App {
  render() {
    const { Component, pageProps, apiService, client } = this.props;

    const authService = new AuthorizationService(apiService, client);
    const vehicleService = new VehicleService(apiService);
    const accountService = new AccountService(apiService, client);

    return (
      <Container>
        <Head>
          <title>Premium Parking</title>
        </Head>
        <AuthorizationProvider value={{ authService }}>
          <AccountProvider value={{ vehicleService, accountService }}>
            <ThemeProvider theme={theme}>
              <>
                <GlobalStyles />
                <Component apiService={apiService} {...pageProps} client={client} />
              </>
            </ThemeProvider>
          </AccountProvider>
        </AuthorizationProvider>
      </Container>
    );
  }
}

export default withApolloClient(withApiService(MyApp));
