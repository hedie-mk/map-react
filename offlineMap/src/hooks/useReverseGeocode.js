export function useReverseGeocode(baseUrl, setLoading) {
  async function getAddress([lng, lat]) {
    try {
      setLoading(true);
      const res = await fetch(
        `${baseUrl}/api/map/reverse?lat=${lat}&lon=${lng}`
      );
      if (!res.ok) return null;
      return await res.json();
    } finally {
      setLoading(false);
    }
  }

  return { getAddress };
}