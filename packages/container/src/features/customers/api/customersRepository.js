import ApiRepository from '../../../api/apiRepository';
import Customer from '../model/Customer';

class CustomersRepository extends ApiRepository {
  constructor() {
    super('/customers');
  }

  async getAll(params = {}) {
    const data = await super.getAll(params);
    return Array.isArray(data) ? data.map((item) => new Customer(item)) : [];
  }

  async getById(id) {
    const data = await super.getById(id);
    return data ? new Customer(data) : null;
  }

  async search(query) {
    return this.getAll({ q: query });
  }

  async create(data) {
    const responseData = await super.create(data);
    return responseData ? new Customer(responseData) : null;
  }

  async update(id, data) {
    const responseData = await super.update(id, data);
    return responseData ? new Customer(responseData) : null;
  }

  async patch(id, data) {
    const responseData = await super.patch(id, data);
    return responseData ? new Customer(responseData) : null;
  }
}

const customersRepository = new CustomersRepository();
export default customersRepository;
