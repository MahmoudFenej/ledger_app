import httpClient from './httpClient';

class ApiRepository {

  constructor(resource) {
    this.resource = resource;
    this.http = httpClient;
  }

  async getAll(params = {}) {
    const response = await this.http.get(this.resource, { params });
    return response.data;
  }

  async getById(id) {
    const response = await this.http.get(`${this.resource}/${id}`);
    return response.data;
  }

  async create(data) {
    const response = await this.http.post(this.resource, data);
    return response.data;
  }

  async update(id, data) {
    const response = await this.http.put(`${this.resource}/${id}`, data);
    return response.data;
  }

  async patch(id, data) {
    const response = await this.http.patch(`${this.resource}/${id}`, data);
    return response.data;
  }

  async delete(id) {
    const response = await this.http.delete(`${this.resource}/${id}`);
    return response.data;
  }
}

export default ApiRepository;
