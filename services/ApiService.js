import axios from 'axios';

export default class ApiService {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.API_URL,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });

    Object.assign(this, this.instance);
  }
}
