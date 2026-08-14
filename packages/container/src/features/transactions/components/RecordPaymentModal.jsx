import { useState } from 'react';
import { Modal, Button } from '../../../shared/ui';
import { todayISO } from '../../../shared/utils/formatters';

export default function RecordPaymentModal({ isOpen, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(todayISO());
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setSubmitting(true);
    try {
      await onSubmit({ amount, date, notes });
      setAmount('');
      setDate(todayISO());
      setNotes('');
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Payment">
      <form onSubmit={handleSubmit}>
        <div className="modal__field">
          <label htmlFor="payment-amount">Amount (USD)</label>
          <input
            id="payment-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="modal__field">
          <label htmlFor="payment-date">Date</label>
          <input
            id="payment-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="modal__field">
          <label htmlFor="payment-notes">Notes (optional)</label>
          <textarea
            id="payment-notes"
            placeholder="Add a note..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <div className="modal__actions">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
