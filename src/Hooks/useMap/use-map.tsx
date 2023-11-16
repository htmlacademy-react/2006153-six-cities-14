import { useState, useRef, useEffect } from 'react';
import { Hotels } from '../../const/const';
import leaflet from 'leaflet';

function useMap(mapRef: React.RefObject<HTMLElement>, hotels: Hotels[]) {
  const [map, setMap] = useState(null);
  const isMapInitialized = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isMapInitialized.current) {
      isMapInitialized.current = true;
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: hotels.points[0].latitude,
          lng: hotels.points[0].longitude,
        },
        zoom: 11,
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
    }
  }, [mapRef, hotels]);
  return map;
}

export default useMap;
