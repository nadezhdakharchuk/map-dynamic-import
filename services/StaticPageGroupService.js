import gql from 'graphql-tag';

export default class StaticPageGroupService {
  constructor(apolloClient) {
    this.apolloClient = apolloClient;
  }

  fetchStaticPageGroups() {
    return this.apolloClient
      .query({
        fetchPolicy: 'no-cache',
        query: gql`
          {
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
      })
      .then(({ data }) => {
        return { staticPageGroups: data.static_page_groups };
      })
      .catch(error => {
        console.log('fetchStaticPageGroups ERROR', error);
        // Fail gracefully
        return { staticPageGroups: [] };
      });
  }
}
