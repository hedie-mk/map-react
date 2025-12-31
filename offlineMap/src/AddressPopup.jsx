import { Popup } from '@vis.gl/react-maplibre';

export default function AddressPopup({ coords, address, onClose }) {
  if (!coords || !address) return null;
    
  return (
    <Popup
      longitude={coords[0]}
      latitude={coords[1]}
      offset={25}
      onClose={onClose}
      closeButton={true}
    >
      <div className="address-popup" dir="rtl">
        {address.neighborhood || ""}, {address.mainRoad || ""}, {address.street || ""}
      </div>
    </Popup>
  );
}