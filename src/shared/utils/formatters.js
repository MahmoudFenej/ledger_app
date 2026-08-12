export function formatCurrency(amount) {
  if (amount == null) return '$0';
  return `$${Number(amount).toLocaleString('en-US')}`;
}


export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}


export function formatRelativeDate(dateStr) {
  if (!dateStr) return '—';

  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffMs = today - date;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  return formatDate(dateStr);
}

export function todayISO() {
  return new Date().toISOString().split('T')[0];
}
