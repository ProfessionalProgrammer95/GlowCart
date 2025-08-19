import axios from 'axios';

export const fetchProducts = async () => {
  try {
    const res = await axios.get('https://dummyjson.com/products?limit=10');
    return res.data.products;
  } catch (err) {
    console.error(err);
    return [];
  }
};
