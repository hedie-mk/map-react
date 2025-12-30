import { useState , useEffect } from 'react';
import MapView from '../components/map/MapView';
import { useRouting } from '../hooks/useRouting';
import { useReverseGeocode } from '../hooks/useReverseGeocode';
import { useRouteFromUrl } from '../hooks/useRouteFromUrl';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import RouteSummary from '../components/ui/RouteSummary';

export default function MapPage() {
  const baseUrl = 'https://localhost:7046';
  const [dark, setDark] = useState(false);
  const [directionsOpen, setDirectionsOpen] = useState(false);
  const [popup, setPopup] = useState(null);
  const [startAddress, setStartAddress] = useState(null);
  const [endAddress, setEndAddress] = useState(null);


  const {
  start,
  end,
  setStart,
  setEnd,
  routeGeoJson,
  routeSteps,
  routeInfo,
  loading,
  setLoading,
  handleMapClick,
  drawRoute,
} = useRouting(baseUrl);


  const { getAddress } = useReverseGeocode(baseUrl, setLoading);

  useRouteFromUrl(setStart, setEnd, drawRoute);

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
  }, [dark]);



  async function onMapClick(lngLat) {
    await handleMapClick(lngLat);

  }
  useEffect(() => {
    if (!start) return;

    getAddress(start).then(setStartAddress);
  }, [start]);

  useEffect(() => {
    if (!end) return;

    getAddress(end).then(setEndAddress);
  }, [end]);

  useEffect(() => {
    if (start && startAddress) {
      setPopup({ coords: start, address: startAddress });
    }
  }, [startAddress]);

  useEffect(() => {
    if (end && endAddress) {
      setPopup({ coords: end, address: endAddress });
    }
  }, [endAddress]);




  const formatAddress = (addr) => {
    if (!addr) return '';
    let html = '';
    if (addr.building) html += `<strong>ساختمان:</strong> ${addr.building}<br>`;
    if (addr.street) html += `<strong>کوچه/خیابان:</strong> ${addr.street}` + (addr.houseNumber ? ` #${addr.houseNumber}` : "") + "<br>";
    if (addr.mainRoad) html += `<strong>خیابان اصلی:</strong> ${addr.mainRoad}<br>`;
    if (addr.neighborhood) html += `<strong>محله:</strong> ${addr.neighborhood}<br>`;
    if (addr.district) html += `<strong>ناحیه:</strong> ${addr.district}<br>`;
    if (addr.city) html += `<strong>شهر:</strong> ${addr.city}<br>`;
    if (addr.postalCode) html += `<strong>کد پستی:</strong> ${addr.postalCode}<br>`;
    if (addr.nearby) html += `<strong>نزدیک:</strong> ${addr.nearby}<br>`;
    return html;
  };

  return (
    <div className="map-container" style={{ display: 'flex', height: '80vh' }}>
        <LoadingOverlay visible={loading} />

        {/* MAP */}
        <div id='map' style={{ flex: 3 }}>
            <MapView
                baseUrl={baseUrl}
                styleUrl={dark ? '/map/style-dark.json' : '/map/style.json'}
                start={start}
                end={end}
                routeGeoJson={routeGeoJson}
                onMapClick={onMapClick}
                popup={popup}
                setPopup={setPopup}
            />
        </div>

        <div className="theme-toggle-form">
            <form className="d-flex align-items-center">
                
                <span className="ms-1"><i className="bi bi-moon"></i></span>
                <div className="form-check form-switch">
                    <input 
                        className="form-check-input" 
                        type="checkbox"
                        checked={dark}
                        onChange={e => setDark(e.target.checked)} 
                        role="switch" 
                        id="modeSwitch"/>
                </div>
                <span className="me-1"><i className="bi bi-sun"></i></span>
                
            </form>
        </div>

        
        {/* Directions Panel */}
        <div
            id='directions'
            className="directions-panel"
            style={{
              transform: directionsOpen ? 'translateY(0)' : 'translateY(100%)', 
              direction: "ltr",
              transition: 'transform 0.3s'
            }}
        >
            <div dir="rtl" className="directions-header">
              <h3>اطلاعات مسیر</h3>
              <button id="close-directions" onClick={() => setDirectionsOpen(false)}>×</button>
            </div>

            <div dir="rtl" id="route-distance">
                {routeInfo && (
                  <>
                    فاصله: {(routeInfo.distance / 1000).toFixed(2)} کیلومتر،
                    زمان: {(routeInfo.duration / 60).toFixed(0)} دقیقه
                  </>
                )}
            </div>
            
            <RouteSummary
              startAddress={startAddress}
              endAddress={endAddress}
            />
            

            <h3 dir="rtl" className="section-title">مسیریابی</h3>
            <hr />
            <ul dir="rtl" id="directions-list">
                {routeSteps.map((s, i) => (
                    <li key={i}>{i + 1}. {s.text}</li>
                ))}
            </ul>
        </div>

        {/* Open Directions Button */}
        {!directionsOpen && (
            <button
            id="open-directions"
            style={{ position: 'absolute', bottom: 20, left: 20, zIndex: 5 }}
            onClick={() => setDirectionsOpen(true)}
            >
            مسیریابی
            </button>
        )}
        </div>
  );
}
