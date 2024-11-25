import axios from 'axios';

// Base URL of your backend server
const BASE_URL = 'http://192.168.10.82:8080/api/';


const base_url = 'http://127.0.0.1:5000';

// const base_url = 'https://buildclubbackend.mojomotor.in';




// Function to fetch data using GET request
export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


// Function to send data using POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Function to send data using PUT request
export const putData = async (endpoint, data) => {
  try {
    const response = await axios.put(`${BASE_URL}${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error('Error putting data:', error);
    throw error;
  }
};


// Function to receive single vehicle data by id using GET request
export const fetchSingleData = async (endpoint, path) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}/${path}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default base_url;