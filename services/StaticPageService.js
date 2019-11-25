import gql from 'graphql-tag';

export default class StaticPageService {
  constructor(apolloClient) {
    this.apolloClient = apolloClient;
  }

  fetchStaticPage(groupSlug, pageSlug) {
    return this.apolloClient
      .query({
        fetchPolicy: 'no-cache',
        query: gql`
        {
          static_page_group(archived: false, slug: "${groupSlug}") {
            slug
            static_pages(archived: false, published: true) {
              slug
              navigation {
                icon
                title
              }
            }
            static_page(archived: false, slug: "${pageSlug}") {
              sections {
                max_width
                padding
                title {
                  text
                  color
                }
                background {
                  color
                  image {
                    lazy {
                      url
                    }
                    large {
                      url
                    }
                  }
                }
                columns {
                  position
                  text_align
                  title {
                    text
                    color
                    size
                  }
                  description {
                    text
                    color
                    tag
                    size
                  }
                  image {
                    lazy {
                      url
                    }
                    large {
                      url
                    }
                    url
                    description
                    image_width
                    image_height
                    image_max_width
                    image_max_height
                  }
                  action {
                    kind
                    link
                    title
                  }
                }
              }
            }
          }
        }
        `,
      })
      .then(({ data }) => {
        return { staticPageGroup: data.static_page_group, staticPage: data.static_page_group.static_page };
      })
      .catch(error => {
        console.log('fetchStaticPage ERROR', error);
        // Fail gracefully
        return { staticPageGroup: null, staticPage: null };
      });
  }
}
