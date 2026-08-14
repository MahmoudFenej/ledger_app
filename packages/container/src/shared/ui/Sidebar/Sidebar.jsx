import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/',             label: 'Dashboard',    icon: '📊' },
  { to: '/customers',    label: 'Customers',    icon: '👥' },
  { to: '/transactions', label: 'Transactions', icon: '💳' },
  { to: '/settings',     label: 'Settings',     icon: '⚙️' },
];

export default function Sidebar({ onSignOut }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar__brand">
        <span className="sidebar__logo">📒</span>
        <span className="sidebar__brand-text">Client Ledger</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
            }
          >
            <span className="sidebar__link-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar__user">
        <div className="sidebar__avatar">A</div>
        <div className="sidebar__user-info">
          <span className="sidebar__user-name">Ayman</span>
          <span className="sidebar__user-role">Admin</span>
        </div>
        <button className="sidebar__signout" onClick={onSignOut} title="Sign Out">
          ⎋
        </button>
      </div>
    </aside>
  );
}
