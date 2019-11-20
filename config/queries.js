import gql from 'graphql-tag';

export default {
  GET_LOCATION_PAGE_DATA: gql`
    query getLocationPageData($name: String!) {
      location(slug: $name) {
        id
        name
        friendly_name
        address
        city
        state
        zip
        dead_rate
        latitude
        longitude
        reservation_instructions
        features {
          id
          title
          icon {
            url
          }
        }
        recurring_rates(archived: false, visible: true) {
          id
          name
        }
        color_theme {
          id
          content_color
          text_color
        }
        overlay_points {
          latitude
          longitude
        }
        photo {
          lazy {
            url
          }
          medium {
            url
          }
        }
        additional_photos {
          lazy {
            url
          }
          medium {
            url
          }
        }
      }
    }
  `,
  GET_FOOTER_DATA: gql`
    query getFooterData {
      markets(archived: false, top_market: true) {
        id
        slug
        name
      }
      static_page_groups(archived: false, published: true) {
        title
        slug
        static_pages(archived: false, published: true) {
          slug
          navigation {
            title
          }
        }
      }
    }
  `,
  GET_GLOBAL_DATA: gql`
    query getGlobalData {
      me {
        email
        phone
        first_name
        last_name
      }
      markets(archived: false, top_market: true) {
        id
        slug
        name
      }
      static_page_groups(archived: false, published: true) {
        title
        slug
        static_pages(archived: false, published: true) {
          slug
          navigation {
            title
          }
        }
      }
    }
  `,
  GET_CURRENT_PROFILE_DATA: gql`
    {
      me {
        email
        phone
        first_name
        last_name
        auth_token
      }
    }
  `,
  GET_LOGIN_INFO: gql`
    query getLoginInfo($login: String!) {
      login_info(login: $login) {
        login_type
        login_value
        password_required
      }
    }
  `,
  GET_PROFILE_PAYMENT_METHODS_DATA: gql`
    query getProfilePaymentMethods {
      me {
        payment_methods(archived: false, entity_types: CARD) {
          entity_id
          name
          last4
        }
      }
    }
  `,
};
