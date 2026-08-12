import { Table } from '../../../shared/ui';
import { formatCurrency, formatDate } from '../../../shared/utils/formatters';
import './TransactionTable.css';


export default function TransactionTable({ transactions, showCustomer = false, customersMap = {} }) {
  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (row) => formatDate(row.date),
    },
  ];

  if (showCustomer) {
    columns.push({
      key: 'customer',
      label: 'Customer',
      render: (row) => customersMap[row.customerId] || `Customer #${row.customerId}`,
    });
  }

  columns.push(
    {
      key: 'type',
      label: 'Type',
      render: (row) => (
        <span className={`txn-type txn-type--${row.type?.toLowerCase()}`}>
          {row.type === 'Recharge' ? '↑' : '↓'} {row.type}
        </span>
      ),
    },
    { key: 'description', label: 'Description' },
    {
      key: 'amount',
      label: 'Amount',
      render: (row) => formatCurrency(row.amount),
    },
    {
      key: 'paid',
      label: 'Paid',
      render: (row) => formatCurrency(row.paid),
    },
    {
      key: 'remaining',
      label: 'Remaining',
      render: (row) => (
        <span className={row.remaining > 0 ? 'txn-remaining--unpaid' : 'txn-remaining--paid'}>
          {formatCurrency(row.remaining)}
        </span>
      ),
    }
  );

  return (
    <Table columns={columns} data={transactions} className="transaction-table" />
  );
}
