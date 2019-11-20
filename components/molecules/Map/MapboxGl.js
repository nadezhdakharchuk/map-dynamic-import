import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash';
import MapMarker from 'components/atoms/MapMarker';
import MapPin from 'components/atoms/MapPin';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  height: 100%;
`;

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const prepareOverlayPoints = location => {
  const overlayPoints = location.overlay_points;
  overlayPoints.push(location.overlay_points[0]);
  return overlayPoints.map(point => [point.longitude, point.latitude]);
};

const colorThemes = markers => {
  return _.map(
    _.uniqBy(markers, item => item.color_theme.id),
    item => item.color_theme,
  );
};

const locationsPolygons = markers => {
  const locationsWithPolygons = markers.filter(location => location.overlay_points.length);

  return locationsWithPolygons.map(location => {
    return {
      type: 'Feature',
      properties: {
        colorThemeId: location.color_theme.id,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [prepareOverlayPoints(location)],
      },
    };
  });
};

const locationPoints = markers => {
  const locationsWithCoordinates = markers.filter(location => location.longitude && location.latitude);
  return locationsWithCoordinates.map(location => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude],
      },
      properties: {
        title: location.friendly_name,
        description: location.description,
        url: `/${location.friendly_name}`,
        overloaded: location.overloaded,
        colorTheme: location.color_theme,
        competitor: location.competitor,
      },
    };
  });
};

const addPolygonsToMap = (map, markers) => {
  map.addSource('polygons', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: locationsPolygons(markers),
    },
  });

  colorThemes(markers).forEach(theme => {
    map.addLayer({
      id: `marker-polygon-background-theme-${theme.id}`,
      type: 'fill',
      source: 'polygons',
      paint: {
        'fill-color': theme.content_color,
        'fill-opacity': 0.2,
      },
      filter: ['==', 'colorThemeId', theme.id],
    });

    map.addLayer({
      id: `marker-polygon-line-theme-${theme.id}`,
      type: 'line',
      source: 'polygons',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': theme.content_color,
        'line-width': 3,
      },
      filter: ['==', 'colorThemeId', theme.id],
    });
  });
};

const addMarkersToMap = (map, markers, attraction) => {
  const geojson = {
    type: 'FeatureCollection',
    features: locationPoints(markers),
  };

  geojson.features.forEach(marker => {
    const mapboxPin = ReactDOMServer.renderToString(
      <MapMarker
        name={marker.properties.title}
        overloaded={marker.properties.overloaded}
        colorTheme={marker.properties.colorTheme}
        competitor={marker.properties.competitor}
      />,
    );
    const el = document.createElement('div');
    el.innerHTML = mapboxPin;

    new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).addTo(map);

    el.addEventListener('click', () => {
      if (attraction === undefined || !attraction.length) {
        window.location = marker.properties.url;
      }
    });
  });
};

const centerTheMap = (map, attraction) => {
  const mq = window.matchMedia('(min-width: 420px)');
  if (mq.matches) {
    map.setCenter([attraction[1], attraction[0]]);
  } else {
    map.setCenter([attraction[1], attraction[0] - 0.003]);
  }
};

const addAttractionMarkerToMap = (map, attraction) => {
  const mapboxPin = ReactDOMServer.renderToString(<MapPin />);
  const el = document.createElement('div');
  el.innerHTML = mapboxPin;

  new mapboxgl.Marker(el).setLngLat([attraction[1], attraction[0]]).addTo(map);
};

const MapboxGl = props => {
  let markers = [];
  let attraction = [];
  const { currentLocation, fetchedLocations, zoom, currentDestination, ableToZoom, onMapError } = props;
  let latLng = [-92, 42];
  const geolocateControl = false;
  let zoomSize = 16;

  if (zoom) {
    zoomSize = zoom;
  }

  if (currentDestination) {
    attraction = [currentDestination.latitude, currentDestination.longitude];
  }

  if (currentLocation) {
    markers.push(currentLocation);
    latLng = [currentLocation.longitude, currentLocation.latitude];
  } else if (fetchedLocations) {
    markers = fetchedLocations;
  }

  const drawMarkersAndCenterView = map => {
    addMarkersToMap(map, markers, attraction);

    if (attraction.length) {
      addAttractionMarkerToMap(map, attraction);
      centerTheMap(map, attraction);
    }
  };

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: latLng,
      zoom: zoomSize,
      scrollZoom: true,
      attributionControl: { compact: false },
    });

    if (!ableToZoom) {
      map.scrollZoom.disable();
    }

    if (geolocateControl) {
      map.addControl(new mapboxgl.GeolocateControl())({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });
    }

    drawMarkersAndCenterView(map);

    map.on('load', () => {
      addPolygonsToMap(map, markers);
    });
    map.on('webglcontextlost', () => {
      console.log('context lost');
      map.remove();
      onMapError();
    });
    map.on('error', () => {
      console.log('error');
      map.remove();
      onMapError();
    });
  }, []);

  return (
    <>
      <MapBox id="mapContainer" data-testid="test-mapboxgl" />
    </>
  );
};

export default MapboxGl;
