import { useState } from 'react';
import { Modal, Button } from '../../../shared/ui';
import { todayISO } from '../../../shared/utils/formatters';

export default function AddRechargeModal({ isOpen, onClose, onSubmit }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(todayISO());
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setSubmitting(true);
    try {
      await onSubmit({ amount, description, date, notes });
      setAmount('');
      setDescription('');
      setDate(todayISO());
      setNotes('');
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Recharge">
      <form onSubmit={handleSubmit}>
        <div className="modal__field">
          <label htmlFor="recharge-amount">Amount (USD)</label>
          <input
            id="recharge-amount"
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
          <label htmlFor="recharge-desc">Description (optional)</label>
          <input
            id="recharge-desc"
            type="text"
            placeholder="e.g. Alfa Recharge"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="modal__field">
          <label htmlFor="recharge-date">Date</label>
          <input
            id="recharge-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="modal__field">
          <label htmlFor="recharge-notes">Notes (optional)</label>
          <textarea
            id="recharge-notes"
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
