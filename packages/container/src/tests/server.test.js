// server.test.ts

describe('Dummy API Server (JSON Server)', () => {
    const BASE_URL = 'http://localhost:5000';
  
    it('should successfully fetch the list of customers', async () => {
      // 1. Make the request to the dummy server
      const response = await fetch(`${BASE_URL}/customers`);
      
      // 2. Parse the JSON data
      const data = await response.json();
  
      // 3. Assertions to verify the server is working correctly
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      // Verify it matches the format of data we put in db.json
      expect(data[0]).toHaveProperty('name', 'Ahmed Ali');
      expect(typeof data[0].currentBalance).toBe('number');
    });
  
    it('should successfully filter transactions by customerId', async () => {
      const customerId = '1';
      const response = await fetch(`${BASE_URL}/transactions?customerId=${customerId}`);
      const data = await response.json();
  
      expect(response.status).toBe(200);
      expect(Array.isArray(data)).toBe(true);
      
      // Check that every transaction returned actually belongs to customer 1
      data.forEach((transaction) => {
        expect(transaction.customerId).toBe(customerId);
      });
    });
  });