import { useState, useRef, useEffect } from 'react';
import { Hotels } from '../../const/const';
import leaflet, { Map } from 'leaflet';

function useMap(mapRef: React.RefObject<HTMLElement>, CITY_OFFERS: Hotels) {
  const [map, setMap] = useState<Map | null>(null);
  const isMapInitialized = useRef(false);

  useEffect(() => {
    if (
      mapRef.current !== null &&
      !isMapInitialized.current &&
      CITY_OFFERS.points !== undefined
    ) {
      isMapInitialized.current = true;
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: CITY_OFFERS.points[0].latitude,
          lng: CITY_OFFERS.points[0].longitude,
        },
        zoom: 12,
      });
      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        )
        .addTo(instance);
      setMap(instance);
    } else if (map !== null && CITY_OFFERS.points !== undefined) {
      const newCenter = {
        lat: CITY_OFFERS.points[0].latitude,
        lng: CITY_OFFERS.points[0].longitude,
      };
      map.setView(newCenter, map.getZoom());
    }
  }, [mapRef, CITY_OFFERS.points, map, setMap]);
  return map;
}

export default useMap;
