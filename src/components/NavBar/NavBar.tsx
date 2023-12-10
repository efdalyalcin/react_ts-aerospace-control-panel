import { NavLink } from 'react-router-dom';
import './NavBar.scss';

export default function NavBar() {
  return (
    <nav className="NavBar">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'NavBar__item NavBar__item--active' : 'NavBar__item'
        }
      >
        Instant Data
      </NavLink>
      <NavLink
        to="/websocket"
        className={({ isActive }) =>
          isActive ? 'NavBar__item NavBar__item--active' : 'NavBar__item'
        }
      >
        Continuous Data Flow
      </NavLink>
    </nav>
  );
}
