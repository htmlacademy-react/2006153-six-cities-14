import { useState, useRef, useEffect } from 'react';
import leaflet, { Map } from 'leaflet';
import { Offers } from '../../const/const';

function useMap(
  mapRef: React.RefObject<HTMLElement>,
  hotelsPins: Offers[] | number
) {
  const [map, setMap] = useState<Map | null>(null);
  const isMapInitialized = useRef(false);

  useEffect(() => {
    if (
      typeof hotelsPins !== 'number' &&
      mapRef.current !== null &&
      !isMapInitialized.current &&
      hotelsPins[0] !== undefined
    ) {
      isMapInitialized.current = true;
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: hotelsPins[0].city.location.latitude,
          lng: hotelsPins[0].city.location.longitude,
        },
        zoom: hotelsPins[0].city.location.zoom,
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
    } else if (map !== null && hotelsPins !== undefined) {
      const newCenter = {
        lat:
          typeof hotelsPins !== 'number'
            ? hotelsPins[0].city.location.latitude
            : 0,
        lng:
          typeof hotelsPins !== 'number'
            ? hotelsPins[0].city.location.longitude
            : 0,
      };
      map.setView(newCenter, map.getZoom());
    }
  }, [mapRef, hotelsPins, map, setMap]);
  return map;
}

export default useMap;
