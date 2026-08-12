import './Badge.css';

export default function Badge({ status }) {
  const variant = status?.toLowerCase() === 'paid' ? 'success' : 'danger';

  return (
    <span className={`badge badge--${variant}`}>
      {status}
    </span>
  );
}
