import { useState } from 'react';
import { Modal, Button } from '../../../shared/ui';

export default function AddCustomerModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({ name: name.trim(), phone: phone.trim() });
      setName('');
      setPhone('');
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Customer">
      <form onSubmit={handleSubmit}>
        <div className="modal__field">
          <label htmlFor="customer-name">Name</label>
          <input
            id="customer-name"
            type="text"
            placeholder="Enter customer name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="modal__field">
          <label htmlFor="customer-phone">Phone</label>
          <input
            id="customer-phone"
            type="text"
            placeholder="e.g. 71 234 567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
