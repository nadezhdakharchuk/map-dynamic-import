const nextRoutes = require('next-routes');
const routes = require('./config/routes');

module.exports = nextRoutes()
  .add(routes.HOME_PAGE)
  .add(routes.LOCATIONS_PAGE)
  .add(routes.MARKET_PAGE)
  .add(routes.VENUE_PAGE)
  .add(routes.VENUE_EVENT_PAGE)
  .add(routes.SEARCH_PAGE)
  .add(routes.STATIC_PAGE)
  .add(routes.LOCATION_PAGE);
