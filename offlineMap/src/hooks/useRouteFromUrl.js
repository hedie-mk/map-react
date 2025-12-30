import { useEffect } from 'react';

export function useRouteFromUrl(setStart, setEnd, drawRoute) {
  useEffect(() => {
    const route = new URLSearchParams(window.location.search).get('route');
    if (!route) return;

    const [, coords] = route.split('/');
    if (!coords) return;

    const [s, e] = coords.split(';');
    if (!s || !e) return;

    const start = s.split(',').map(Number);
    const end = e.split(',').map(Number);

    setStart(start);
    setEnd(end);
    drawRoute(start, end);
  }, []);
}