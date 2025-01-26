import axios from 'axios';

const API_URL = 'https://portfolio-backend-vt4g.onrender.com/api/stocks';

export const getAllStocks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks:', error);
    throw error;
  }
};

export const addStock = async (stock) => {
  try {
    const response = await axios.post(API_URL, stock);
    return response.data;
  } catch (error) {
    console.error('Error adding stock:', error);
    throw error;
  }
};

export const updateStock = async (id, stock) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, stock);
    return response.data;
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};

export const deleteStock = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting stock:', error);
    throw error;
  }
};
