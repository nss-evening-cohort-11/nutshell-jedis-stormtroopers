import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getShifts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shifts.json`)
    .then((response) => {
      const theShifts = response.data;
      const shifts = [];
      if (theShifts) {
        Object.keys(theShifts).forEach((shiftId) => {
          theShifts[shiftId].id = shiftId;
          shifts.push(theShifts[shiftId]);
        });
      }
      resolve(shifts);
    })
    .catch((err) => reject(err));
});

const deleteShift = (shiftId) => axios.delete(`${baseUrl}/shifts/${shiftId}.json`);

export default { getShifts, deleteShift };
