import { useState, useEffect } from 'react';
import { PageHeader, SearchInput, Button } from '../../shared/ui';
import CustomerTable from '../../features/customers/components/CustomerTable';
import AddCustomerModal from '../../features/customers/components/AddCustomerModal';
import { useCustomers } from '../../features/customers/services/customerService';
import './CustomersPage.css';

export default function CustomersPage() {
  const {
    customers,
    loading,
    searchCustomers,
    addCustomer,
  } = useCustomers();

  const [searchInput, setSearchInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    searchCustomers(searchInput);
  }, [searchInput, searchCustomers]);

  return (<div className="customers-page">
      <PageHeader title="Customers">
        <Button variant="primary" icon="+" onClick={() => setShowAddModal(true)}>
          Add Customer
        </Button>
      </PageHeader>

      <div className="customers-page__toolbar">
        <SearchInput
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search customers..."
        />
      </div>

      <div className="customers-page__table-card">
        {loading ? (
          <div className="customers-page__loading">Loading...</div>
        ) : (
          <>
            <CustomerTable customers={customers} />
          </>
        )}
      </div>

      <AddCustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={addCustomer}
      />
    </div>
  );
}
