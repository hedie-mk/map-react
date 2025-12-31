import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-maplibre';
import maplibregl from 'maplibre-gl';

export default function FitBounds({ geojson }) {
  const { current: map } = useMap();

  useEffect(() => {
    if (!map || !geojson?.features?.length) return;

    const bounds = new maplibregl.LngLatBounds();
    geojson.features[0].geometry.coordinates.forEach(c =>
      bounds.extend(c)
    );

    map.fitBounds(bounds, { padding: 40 });
  }, [geojson]);

  return null;
}