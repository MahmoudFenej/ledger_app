import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import customersRepository from '../api/customersRepository';
import Customer from '../model/Customer';
import { todayISO } from '../../../shared/utils/formatters';

export function useCustomers() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');

  const customersQuery = useQuery({
    queryKey: ['customers', { search: searchQuery }],
    queryFn: () => searchQuery ? customersRepository.search(searchQuery) : customersRepository.getAll(),
  });

  const addCustomerMutation = useMutation({
    mutationFn: async ({ name, phone }) => {
      const newCustomer = new Customer({
        name,
        phone,
        currentBalance: 0,
        lastPaymentDate: todayISO(),
        status: 'Paid',
      });
      return customersRepository.create(newCustomer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    },
  });

  const searchCustomers = useCallback((query) => {
    setSearchQuery(query || '');
  }, []);

  const allCustomers = customersQuery.data || [];

  return {
    customers: allCustomers,
    allCustomers,
    loading: customersQuery.isLoading || addCustomerMutation.isPending,
    error: customersQuery.error?.message || addCustomerMutation.error?.message || null,
    searchQuery,
    fetchCustomers: () => customersQuery.refetch(),
    searchCustomers,
    addCustomer: addCustomerMutation.mutateAsync,
  };
}
