import { useState, useCallback } from 'react';

export function useRouting(baseUrl) {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [routeGeoJson, setRouteGeoJson] = useState(null);
  const [routeSteps, setRouteSteps] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleMapClick = useCallback(async (lngLat) => {
    const coords = [lngLat.lng, lngLat.lat];

    if (!start) {
      setStart(coords);
    } else if (!end) {
      setEnd(coords);
      await drawRoute(start, coords);
    } else {
      // reset route
      setStart(coords);
      setEnd(null);
      setRouteGeoJson(null);
      setRouteSteps([]);
      setRouteInfo(null);
    }
  }, [start, end]);

  const drawRoute = useCallback(async (startCoords, endCoords) => {
    if (!startCoords || !endCoords) return;

    setLoading(true);

    try {
      const url =
        `${baseUrl}/route/v1/driving/` +
        `${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?steps=true`;

      const res = await fetch(url);
      if (!res.ok) throw new Error('Route not found');

      const geojson = await res.json();

      const feature = geojson?.features?.[0];
      if (!feature?.properties) return;

      setRouteGeoJson(geojson);
      setRouteSteps(feature.properties.steps || []);
      setRouteInfo({
        distance: feature.properties.distance,
        duration: feature.properties.duration,
      });
    } catch (err) {
      console.error('Draw route failed:', err);
      alert('محاسبه مسیر ناموفق بود');
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  return {
    // markers
    start,
    end,
    setStart,
    setEnd,

    // route data
    routeGeoJson,
    routeSteps,
    routeInfo,

    // ui
    loading,
    setLoading,

    // actions
    handleMapClick,
    drawRoute,
  };
}
