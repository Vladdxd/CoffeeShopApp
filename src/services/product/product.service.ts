import axios from 'axios';

const URL = 'http://192.168.0.106:3000';

export const Product = {
  getCoffee: async () => {
    const response = await axios.get(`${URL}/coffee`);

    return response.data;
  },
  getProductById: async (id: string, type: string) => {
    const response = await axios.get(`${URL}/${type.toLowerCase()}?id=${id}`);

    return response.data[0];
  },
  getBeans: async () => {
    const data = await axios.get(`${URL}/bean`);

    return data.data;
  },
};
