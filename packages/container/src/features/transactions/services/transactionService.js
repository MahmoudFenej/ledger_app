import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import transactionsRepository from '../api/transactionsRepository';
import Transaction from '../model/Transaction';
import { todayISO } from '../../../shared/utils/formatters';
import customersRepository from '../../customers/api/customersRepository';


export function useTransactions() {
  const queryClient = useQueryClient();

  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: () => transactionsRepository.getAll({ _sort: '-date' }),
  });

  const addRechargeMutation = useMutation({
    mutationFn: async ({ customerId, amount, description, date, notes }) => {
      const txn = new Transaction({
        customerId,
        date: date || todayISO(),
        type: 'Recharge',
        description: description || 'Recharge',
        amount: Number(amount),
        paid: 0,
        remaining: Number(amount),
        notes: notes || '',
      });
      const created = await transactionsRepository.create(txn);

      const customer = await customersRepository.getById(customerId);
      await customersRepository.patch(customerId, {
        currentBalance: Number(customer.currentBalance || 0) + Number(amount),
        status: 'Unpaid',
      });

      return created;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', variables.customerId] });
    },
  });

  const recordPaymentMutation = useMutation({
    mutationFn: async ({ customerId, amount, date, notes }) => {
      const txn = new Transaction({
        customerId,
        date: date || todayISO(),
        type: 'Payment',
        description: 'Cash Payment',
        amount: Number(amount),
        paid: Number(amount),
        remaining: 0,
        notes: notes || '',
      });
      const created = await transactionsRepository.create(txn);

      const customer = await customersRepository.getById(customerId);
      const newBalance = Math.max(0, Number(customer.currentBalance || 0) - Number(amount));
      await customersRepository.patch(customerId, {
        currentBalance: newBalance,
        lastPaymentDate: date || new Date().toISOString().split('T')[0],
        status: newBalance === 0 ? 'Paid' : 'Unpaid',
      });

      return created;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['customer', variables.customerId] });
    },
  });

  return {
    transactions: transactionsQuery.data || [],
    loading: transactionsQuery.isLoading || addRechargeMutation.isPending || recordPaymentMutation.isPending,
    error: transactionsQuery.error?.message || addRechargeMutation.error?.message || recordPaymentMutation.error?.message || null,
    fetchAll: () => transactionsQuery.refetch(),
    fetchByCustomer: () => {
    },
    fetchRecent: () => {
    },
    addRecharge: addRechargeMutation.mutateAsync,
    recordPayment: recordPaymentMutation.mutateAsync,
  };
}
