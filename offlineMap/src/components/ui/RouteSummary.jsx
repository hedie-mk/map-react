export default function RouteSummary({ startAddress, endAddress }) {
  if (!startAddress && !endAddress) return null;

  const renderAddress = (title, addr) => {
    if (!addr) return null;

    return (
      <div dir="rtl" className="route-summary-block">
        <strong>{title}</strong>
        <div className="route-summary-address">
          {addr.building && <div><strong>ساختمان:</strong> {addr.building}</div>}
          {addr.street && (
            <div>
              <strong>کوچه/خیابان:</strong> {addr.street}
              {addr.houseNumber && ` #${addr.houseNumber}`}
            </div>
          )}
          {addr.mainRoad && <div><strong>خیابان اصلی:</strong> {addr.mainRoad}</div>}
          {addr.neighborhood && <div><strong>محله:</strong> {addr.neighborhood}</div>}
          {addr.district && <div><strong>ناحیه:</strong> {addr.district}</div>}
          {addr.city && <div><strong>شهر:</strong> {addr.city}</div>}
          {addr.postalCode && <div><strong>کد پستی:</strong> {addr.postalCode}</div>}
          {addr.nearby && <div><strong>نزدیک:</strong> {addr.nearby}</div>}
        </div>
      </div>
    );
  };

  return (
    <div id="route-summary">
      {renderAddress('مبدا', startAddress)}
      {startAddress && endAddress && <hr />}
      {renderAddress('مقصد', endAddress)}
    </div>
  );
}
