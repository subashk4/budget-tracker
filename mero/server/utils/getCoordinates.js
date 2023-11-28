require('dotenv').config();
const axios = require('axios');

exports.getCoordinates = async (location) => {
  const uri = process.env.STACK_URI;
  const uri_fetch = uri.concat(location);
  try {
    const response = await axios.get(uri_fetch);
    console.log(response.data);
    if (response.status >= 200 && response.status < 300) return response.data;
  } catch (error) {
    return error;
  }
};
