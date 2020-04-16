import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getVendors = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/vendors.json`)
    .then((response) => {
      const vendorResponse = response.data;
      const vendors = [];

      if (vendorResponse) {
        Object.keys(vendorResponse).forEach((vendorId) => {
          vendorResponse[vendorId].id = vendorId;
          vendors.push(vendorResponse[vendorId]);
        });
      }

      resolve(vendors);
    })
    .catch((err) => reject(err));
});

export default { getVendors };
