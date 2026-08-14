export default class Transaction {
  constructor({ id, customerId, date, type, description, amount, paid = 0, remaining = 0, notes = '' }) {
    this.id = id;
    this.customerId = customerId;
    this.date = date;
    this.type = type;
    this.description = description;
    this.amount = Number(amount);
    this.paid = Number(paid);
    this.remaining = Number(remaining);
    this.notes = notes;
  }
}
