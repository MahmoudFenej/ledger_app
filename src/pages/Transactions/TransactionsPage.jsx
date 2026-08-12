import { useState, useMemo } from 'react';
import { PageHeader, Button } from '../../shared/ui';
import TransactionTable from '../../features/transactions/components/TransactionTable';
import NewTransactionModal from '../../features/transactions/components/NewTransactionModal';
import { useTransactions } from '../../features/transactions/services/transactionService';
import { useCustomers } from '../../features/customers/services/customerService';
import './TransactionsPage.css';

export default function TransactionsPage() {
  const { transactions, addRecharge, recordPayment } = useTransactions();
  const { allCustomers } = useCustomers();
  const [showNewTxModal, setShowNewTxModal] = useState(false);

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
    <div className="transactions-page">
      <PageHeader title="Transactions">
        <Button variant="primary" icon="+" onClick={() => setShowNewTxModal(true)}>
          New Transaction
        </Button>
      </PageHeader>

      <div className="transactions-page__table-card">
        <TransactionTable
          transactions={transactions}
          showCustomer={true}
          customersMap={customersMap}
        />
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
