import {NavLink} from "react-router-dom"
export default function NavMenu() {
  return (
    <>
      <div className="top-row ps-3 navbar navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            نقشه آفلاین
          </NavLink>
        </div>
      </div>

      <input
        type="checkbox"
        title="Navigation menu"
        className="navbar-toggler"
      />

      <div
        className="nav-scrollable"
        onClick={() =>
          document.querySelector(".navbar-toggler")?.click()
        }
      >
        <nav className="flex-column">
          <div className="nav-item px-3">
            <NavLink
              className="nav-link"
              to="/"
              end
            >
              <span
                className="bi bi-house-door-fill-nav-menu"
                aria-hidden="true"
              />
              {" "}
              نقشه
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
}