import { useNavigate } from 'react-router-dom';
import { Table, Badge } from '../../../shared/ui';
import { formatCurrency, formatRelativeDate } from '../../../shared/utils/formatters';
import './CustomerTable.css';

export default function CustomerTable({ customers }) {
  const navigate = useNavigate();

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'currentBalance',
      label: 'Current Balance',
      render: (row) => (
        <span className="customer-table__balance">
          {formatCurrency(row.currentBalance)}
        </span>
      ),
    },
    {
      key: 'lastPaymentDate',
      label: 'Last Payment',
      render: (row) => formatRelativeDate(row.lastPaymentDate),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <Badge status={row.status} />,
    },
    {
      key: 'action',
      label: '',
      render: () => <span className="customer-table__chevron">›</span>,
    },
  ];

  return (
    <Table
      columns={columns}
      data={customers}
      onRowClick={(row) => navigate(`/customers/${row.id}`)}
      className="customer-table"
    />
  );
}
