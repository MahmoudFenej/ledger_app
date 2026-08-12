export default class Customer {
  constructor({ id, name, phone, currentBalance = 0, lastPaymentDate = '', status = 'Paid' }) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.currentBalance = Number(currentBalance);
    this.lastPaymentDate = lastPaymentDate;
    this.status = status;
  }

  isUnpaid() {
    return this.currentBalance > 0;
  }
}
