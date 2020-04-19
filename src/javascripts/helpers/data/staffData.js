import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getStaffs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then((response) => {
      const theStaff = response.data;
      const staff = [];
      if (theStaff) {
        Object.keys(theStaff).forEach((staffId) => {
          theStaff[staffId].id = staffId;
          staff.push(theStaff[staffId]);
        });
      }
      resolve(staff);
    })
    .catch((err) => console.error('getStaff broke', reject(err)));
});

const deleteStaff = (staffId) => axios.delete(`${baseUrl}/staff/${staffId}.json`);

const addStaff = (newDino) => axios.post(`${baseUrl}/staff/${newDino}.json`);

const updateStaff = (staffId, modifiedStaff) => axios.put(`${baseUrl}/staff/${staffId}.json`, modifiedStaff);

const getSingleStaffMemeber = (staffId) => axios.get(`${baseUrl}/staff/${staffId}.json`);

export default {
  deleteStaff,
  addStaff,
  updateStaff,
  getSingleStaffMemeber,
  getStaffs,
};