import gql from 'graphql-tag';

module.exports = {
  SIGNIN: gql`
    mutation signin($login: String!, $password: String!) {
      login(login: $login, password: $password) {
        id
        email
        first_name
        last_name
        phone
      }
    }
  `,
};
