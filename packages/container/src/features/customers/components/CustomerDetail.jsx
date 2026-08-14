import { Link } from 'react-router-dom';
import { Button } from '../../../shared/ui';
import { formatCurrency } from '../../../shared/utils/formatters';
import './CustomerDetail.css';


export default function CustomerDetail({ customer, onAddRecharge, onRecordPayment }) {
  if (!customer) return null;

  return (
    <div className="customer-detail">
      <Link to="/customers" className="customer-detail__back">
        ← Back to Customers
      </Link>

      <div className="customer-detail__header">
        <div className="customer-detail__info">
          <h2 className="customer-detail__name">{customer.name}</h2>
          <span className="customer-detail__phone">📞 {customer.phone}</span>
        </div>

        <div className="customer-detail__actions">
          <div className="customer-detail__balance-card">
            <span className="customer-detail__balance-label">Current Balance</span>
            <span className="customer-detail__balance-value">
              {formatCurrency(customer.currentBalance)}
            </span>
          </div>

          <Button variant="success" icon="+" onClick={onAddRecharge}>
            Add Recharge
          </Button>
          <Button variant="primary" icon="📋" onClick={onRecordPayment}>
            Record Payment
          </Button>
        </div>
      </div>
    </div>
  );
}
