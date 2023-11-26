import { useState, useRef, useEffect } from 'react';
import leaflet, { Map } from 'leaflet';
import { Offers } from '../../const/const';

function useMap(mapRef: React.RefObject<HTMLElement>, sortedOffers: Offers[]) {
  const [map, setMap] = useState<Map | null>(null);
  const isMapInitialized = useRef(false);

  useEffect(() => {
    if (
      mapRef.current !== null &&
      !isMapInitialized.current &&
      sortedOffers[0] !== undefined
    ) {
      isMapInitialized.current = true;
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: sortedOffers[0].city.location.latitude,
          lng: sortedOffers[0].city.location.longitude,
        },
        zoom: sortedOffers[0].city.location.zoom,
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
    } else if (map !== null && sortedOffers !== undefined) {
      const newCenter = {
        lat: sortedOffers[0].city.location.latitude,
        lng: sortedOffers[0].city.location.longitude,
      };
      map.setView(newCenter, map.getZoom());
    }
  }, [mapRef, sortedOffers, map, setMap]);
  return map;
}

export default useMap;
