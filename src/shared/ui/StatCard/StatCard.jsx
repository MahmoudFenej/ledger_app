import './StatCard.css';

export default function StatCard({ icon, iconColor, title, value, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ background: iconColor }}>
        {icon}
      </div>
      <div className="stat-card__content">
        <span className="stat-card__title">{title}</span>
        <span className="stat-card__value">{value}</span>
        <span className="stat-card__subtitle">{subtitle}</span>
      </div>
    </div>
  );
}
