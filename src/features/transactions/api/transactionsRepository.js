import ApiRepository from '../../../api/apiRepository';
import Transaction from '../model/Transaction';

class TransactionsRepository extends ApiRepository {
  constructor() {
    super('/transactions');
  }

  async getAll(params = {}) {
    const data = await super.getAll(params);
    return Array.isArray(data) ? data.map((item) => new Transaction(item)) : [];
  }

  async getById(id) {
    const data = await super.getById(id);
    return data ? new Transaction(data) : null;
  }

  async getByCustomerId(customerId) {
    return this.getAll({ customerId, _sort: '-date' });
  }

  async getRecent(limit = 5) {
    const data = await this.getAll({ _sort: '-date' });
    return Array.isArray(data) ? data.slice(0, limit) : [];
  }

  async create(data) {
    const responseData = await super.create(data);
    return responseData ? new Transaction(responseData) : null;
  }
}

const transactionsRepository = new TransactionsRepository();
export default transactionsRepository;
