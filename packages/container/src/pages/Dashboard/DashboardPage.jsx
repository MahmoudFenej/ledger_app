import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '../../features/customers/services/customerService';
import NewTransactionModal from '../../features/transactions/components/NewTransactionModal';
import TransactionTable from '../../features/transactions/components/TransactionTable';
import { useTransactions } from '../../features/transactions/services/transactionService';
import { Button, PageHeader, StatCard } from '../../shared/ui';
import { formatCurrency } from '../../shared/utils/formatters';
import './DashboardPage.css';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { allCustomers } = useCustomers();
  const { transactions, addRecharge, recordPayment } = useTransactions();
  const [showNewTxModal, setShowNewTxModal] = useState(false);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 5);
  }, [transactions]);

  const stats = useMemo(() => {
    const totalCustomers = allCustomers.length;
    const outstandingBalance = allCustomers.reduce((sum, c) => sum + (c.currentBalance || 0), 0);
    const unpaidCustomers = allCustomers.filter((c) => (c.currentBalance || 0) > 0).length;
    const paidToday = transactions
      .filter((t) => t.type === 'Payment')
      .reduce((sum, t) => sum + (t.paid || 0), 0);

    return { totalCustomers, outstandingBalance, unpaidCustomers, paidToday };
  }, [allCustomers, transactions]);

  const customersMap = useMemo(() => {
    const map = {};
    allCustomers.forEach((c) => { map[c.id] = c.name; });
    return map;
  }, [allCustomers]);

  const handleNewTxSubmit = async (data) => {
    if (data.type === 'Recharge') {
      await addRecharge(data);
    } else if (data.type === 'Payment') {
      await recordPayment(data);
    }
  };

  return (
    <div className="dashboard">
      <PageHeader title="Dashboard">
        <Button variant="primary" icon="+" onClick={() => setShowNewTxModal(true)}>
          New Transaction
        </Button>
      </PageHeader>

      <div className="dashboard__stats">
        <StatCard
          icon="👥"
          iconColor="#eff6ff"
          title="Total Customers"
          value={stats.totalCustomers}
          subtitle="All time"
        />
        <StatCard
          icon="💰"
          iconColor="#fef2f2"
          title="Outstanding Balance"
          value={formatCurrency(stats.outstandingBalance)}
          subtitle={`Across ${stats.unpaidCustomers} customers`}
        />
        <StatCard
          icon="✅"
          iconColor="#f0fdf4"
          title="Paid Today"
          value={formatCurrency(stats.paidToday)}
          subtitle={`${transactions.filter((t) => t.type === 'Payment').length} payments`}
        />
        <StatCard
          icon="⚠️"
          iconColor="#fff7ed"
          title="Unpaid Customers"
          value={stats.unpaidCustomers}
          subtitle="Need attention"
        />
      </div>

      <div className="dashboard__section">
        <div className="dashboard__section-header">
          <h2 className="dashboard__section-title">Recent Transactions</h2>
          <button
            className="dashboard__view-all"
            onClick={() => navigate('/transactions')}
          >
            View All
          </button>
        </div>
        <div className="dashboard__table-card">
          <TransactionTable
            transactions={recentTransactions}
            showCustomer={true}
            customersMap={customersMap}
          />
        </div>
      </div>

      <NewTransactionModal
        isOpen={showNewTxModal}
        onClose={() => setShowNewTxModal(false)}
        onSubmit={handleNewTxSubmit}
        customers={allCustomers}
      />
    </div>
  );
}
