import React, { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import L from 'mapbox.js';
import MapMarker from 'components/atoms/MapMarker';

import 'mapbox.js/dist/mapbox.css';

const MapBox = styled.div`
  height: 100%;
`;

L.mapbox.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const locationPointAdded = (feature, marker) => {
  const mapboxPin = ReactDOMServer.renderToString(
    <MapMarker
      name={feature.properties.title}
      overloaded={feature.properties.overloaded}
      colorTheme={feature.properties.colorTheme}
      competitor={feature.properties.competitor}
    />,
  );

  marker.setIcon(
    L.divIcon({
      className: 'marker',
      html: mapboxPin,
      iconSize: [80, 80],
      iconAnchor: [40, 40],
    }),
  );

  marker.addEventListener('click', () => {
    // if (attraction.length) {
    //   e.target.togglePopup();
    //   const result_id = "#" + e.target.feature.properties.title;
    //   const resultItem = '';
    //
    //   if(resultItem) return;
    //
    // }

    window.location = feature.properties.url;
  });
};

const locationsPolygons = markers => {
  const locationsWithPolygons = markers.filter(location => location.overlay_points.length);
  return locationsWithPolygons.map(location => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [location.overlay_points.map(point => [point.longitude, point.latitude])],
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

const addMarkersToMap = (map, markers) => {
  map.addLayer(L.geoJson(locationPoints(markers), { onEachFeature: locationPointAdded }));
  map.addLayer(L.geoJson(locationsPolygons(markers), { color: '#d3140c' }));
};

const addAttractionMarkerToMap = (map, attraction) => {
  if (attraction.length) {
    const latitude = attraction[0];
    const longitude = attraction[1];

    L.mapbox
      .featureLayer({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
        properties: {
          'marker-size': 'large',
          'marker-color': '#fdd901',
        },
      })
      .addTo(map);
  }
};

const MapboxLeaflet = props => {
  let markers = [];
  let attraction = [];
  const { currentLocation, fetchedLocations, zoom, currentDestination, ableToZoom } = props;
  let latLng = [42, -92];
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
    addAttractionMarkerToMap(map, attraction);
    addMarkersToMap(map, markers);

    if (attraction.length) {
      const mq = window.matchMedia('(min-width: 420px)');
      if (mq.matches) {
        map.setView([attraction[0], attraction[1]], 16);
      } else {
        map.setView([attraction[0] - 0.001, attraction[1]], 16);
      }
    }
  };

  useEffect(() => {
    const map = L.mapbox.map('mapContainer', null, {
      attributionControl: { compact: false },
      zoomControl: false,
      minZoom: 1,
    });
    L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v10').addTo(map);

    map.setView(latLng.reverse(), zoomSize);

    if (!ableToZoom) {
      map.scrollWheelZoom.disable();
    }

    // if (geolocateControl) {
    //   map.addControl(new mapboxgl.GeolocateControl)({
    //     positionOptions: {
    //       enableHighAccuracy: true
    //     },
    //     trackUserLocation: true
    //   })
    // }

    drawMarkersAndCenterView(map);
  }, []);

  return <MapBox id="mapContainer" data-testid="test-mapbox" />;
};

export default MapboxLeaflet;
