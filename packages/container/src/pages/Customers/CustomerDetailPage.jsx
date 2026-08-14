import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerDetail from '../../features/customers/components/CustomerDetail';
import TransactionTable from '../../features/transactions/components/TransactionTable';
import AddRechargeModal from '../../features/transactions/components/AddRechargeModal';
import RecordPaymentModal from '../../features/transactions/components/RecordPaymentModal';
import { useCustomerDetail } from '../../features/customers/services/customerDetailService';
import { useTransactions } from '../../features/transactions/services/transactionService';
import './CustomerDetailPage.css';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const { customer, transactions, loading } = useCustomerDetail(id);
  const { addRecharge, recordPayment } = useTransactions();

  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleAddRecharge = async (data) => {
    await addRecharge({ ...data, customerId: id });
  };

  const handleRecordPayment = async (data) => {
    await recordPayment({ ...data, customerId: id });
  };

  if (loading) {
    return <div className="detail-page__loading">Loading...</div>;
  }

  return (
    <div className="detail-page">
      <CustomerDetail
        customer={customer}
        onAddRecharge={() => setShowRechargeModal(true)}
        onRecordPayment={() => setShowPaymentModal(true)}
      />

      <div className="detail-page__section">
        <h3 className="detail-page__section-title">Transactions</h3>
        <div className="detail-page__table-card">
          <TransactionTable transactions={transactions} />
        </div>
      </div>

      <AddRechargeModal
        isOpen={showRechargeModal}
        onClose={() => setShowRechargeModal(false)}
        onSubmit={handleAddRecharge}
      />

      <RecordPaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSubmit={handleRecordPayment}
      />
    </div>
  );
}
