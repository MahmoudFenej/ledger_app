import { useQuery } from '@tanstack/react-query';
import customersRepository from '../api/customersRepository';
import transactionsRepository from '../../transactions/api/transactionsRepository';


export function useCustomerDetail(customerId) {
  const customerQuery = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => customersRepository.getById(customerId),
    enabled: !!customerId,
  });

  const transactionsQuery = useQuery({
    queryKey: ['transactions', { customerId }],
    queryFn: () => transactionsRepository.getByCustomerId(customerId),
    enabled: !!customerId,
  });

  const loading = customerQuery.isLoading || transactionsQuery.isLoading;
  const error = customerQuery.error || transactionsQuery.error;

  return {
    customer: customerQuery.data || null,
    transactions: transactionsQuery.data || [],
    loading,
    error: error ? error.message : null,
    refetch: () => {
      customerQuery.refetch();
      transactionsQuery.refetch();
    },
  };
}
