import axios from "axios";

class ApiRoutes {
  constructor(baseURL) {
    this.baseURL = baseURL; // Base URL for all API routes
  }

  // Method to get the full URL for a specific endpoint with optional query parameters
  getFullURL(endpoint, params = "") {
    if (params) {
      return `${this.baseURL}/${endpoint}/${params}`;
    } else {
      return `${this.baseURL}/${endpoint}`;
    }
  }

  // Generic method for GET requests with dynamic endpoints and params
  async get(endpoint, params = "") {
    const url = this.getFullURL(endpoint, params);
    try {
      const response = await axios.get(url);
      return response.data; // Return the response data
    } catch (error) {
      console.error(`Error fetching from ${endpoint}:`, error);
      throw error; // Re-throw the error after logging
    }
  }

  // Generic method for POST requests with dynamic endpoints and payload
  async post(endpoint, payload, params = "") {
    const url = this.getFullURL(endpoint, params);
    try {
      const response = await axios.post(url, payload);
      return response.data; // Return the response data
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error; // Re-throw the error after logging
    }
  }

  // Example specific method to get users
  async getUsers(params = "") {
    return this.get("users", params);
  }

  // Example specific method to login
  async login(payload) {
    return this.post("user/login", payload);
  }

  // Example specific method to create a user
  async createUser(payload) {
    return this.post("user", payload);
  }

  // Method to fetch a user by ID dynamically
  async getUserById(userId) {
    return this.get(`user/${userId}`);
  }

  // Method to update a user by ID
  async updateUser(userId, payload) {
    return this.post(`user/${userId}`, payload);
  }

  // for getting list data
  async getList(userId) {
    return this.get(`task/${userId}`);
  }
}

export default ApiRoutes;
