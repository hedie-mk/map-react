import { Map, Source, Layer, NavigationControl,Marker  } from '@vis.gl/react-maplibre';
import FitBounds from './FitBounds';
import AddressPopup from './AddressPopup';

const routeLayer = {
  id: 'route-line',
  type: 'line',
  paint: {
    'line-color': '#2563eb',
    'line-width': 6
  }
};


export default function MapView({ 
    baseUrl,
    styleUrl,
    start,
    end,
    routeGeoJson,
    onMapClick,
    popup = null,
    setPopup,
    renderPopup
 }){
    return(
        <Map
            mapStyle={`${baseUrl}${styleUrl}`}
            initialViewState={{
                longitude: 51.406,
                latitude: 35.726,
                zoom: 13
            }}
            style={{ width: '100%', height: '100%' ,position: "absolute"}}
            onClick={e => onMapClick?.(e.lngLat)}
            renderWorldCopies={false}
        >
            <NavigationControl />

            {start && <Marker longitude={start[0]} latitude={start[1]} color="green" />}
            {end && <Marker longitude={end[0]} latitude={end[1]} color="red" />}

            {routeGeoJson?.type === 'FeatureCollection' && (
                <Source id="route" type="geojson" data={routeGeoJson}>
                    <Layer {...routeLayer} />
                </Source>
            )}

            <FitBounds geojson={routeGeoJson} />

            {renderPopup
            ? renderPopup({ popup, close: () => setPopup?.(null) })
            : popup && typeof setPopup === 'function' && (
                <AddressPopup
                    coords={popup.coords}
                    address={popup.address}
                    onClose={() => setPopup(null)}
                />
                )
            }
        </Map>
    )
}