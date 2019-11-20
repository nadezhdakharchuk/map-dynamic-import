module.exports = {
  HOME_PAGE: { name: 'home', pattern: '/', page: 'index' },
  LOCATIONS_PAGE: { name: 'locations', pattern: '/locations', page: 'locations' },
  MARKET_PAGE: { name: 'market', pattern: '/city/:name', page: 'market' },
  VENUE_PAGE: { name: 'venue', pattern: '/city/:name/:slug', page: 'venue' },
  VENUE_EVENT_PAGE: { name: 'venueEvent', pattern: '/city/:name/:slug/:event', page: 'venueEvent' },
  SEARCH_PAGE: { name: 'search', pattern: '/search/:params', page: 'search' },
  STATIC_PAGE: { name: 'staticPage', pattern: '/pages/:group_slug/:page_slug', page: 'staticPage' },
  LOCATION_PAGE: { name: 'location', pattern: '/:name', page: 'location' },
};
