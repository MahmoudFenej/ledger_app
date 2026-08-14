import { useState } from 'react';
import { Modal, Button } from '../../../shared/ui';
import { todayISO } from '../../../shared/utils/formatters';

export default function NewTransactionModal({ isOpen, onClose, onSubmit, customers = [] }) {
  const [customerId, setCustomerId] = useState('');
  const [type, setType] = useState('Recharge'); // Defaults to Recharge
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(todayISO());
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customerId) {
      alert('Please select a customer.');
      return;
    }
    if (!type) {
      alert('Please select a transaction type.');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({ customerId, type, amount, description, date, notes });
      setCustomerId('');
      setType('Recharge');
      setAmount('');
      setDescription('');
      setDate(todayISO());
      setNotes('');
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Transaction">
      <form onSubmit={handleSubmit}>
        <div className="modal__field">
          <label htmlFor="tx-customer">Customer</label>
          <select
            id="tx-customer"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option value="" disabled>-- Select Customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} (Balance: ${c.currentBalance || 0})
              </option>
            ))}
          </select>
        </div>

        <div className="modal__field">
          <label htmlFor="tx-type">Transaction Type</label>
          <select
            id="tx-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="Recharge">Recharge</option>
            <option value="Payment">Payment</option>
          </select>
        </div>

        <div className="modal__field">
          <label htmlFor="tx-amount">Amount (USD)</label>
          <input
            id="tx-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        {type === 'Recharge' && (
          <div className="modal__field">
            <label htmlFor="tx-desc">Description (optional)</label>
            <input
              id="tx-desc"
              type="text"
              placeholder="e.g. Alfa Recharge"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        )}

        <div className="modal__field">
          <label htmlFor="tx-date">Date</label>
          <input
            id="tx-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="modal__field">
          <label htmlFor="tx-notes">Notes (optional)</label>
          <textarea
            id="tx-notes"
            placeholder="Add a note..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div className="modal__actions">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="success" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
