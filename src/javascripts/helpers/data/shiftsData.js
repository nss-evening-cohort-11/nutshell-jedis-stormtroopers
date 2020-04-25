import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getShiftsByAssignmentId = (assignmentId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shifts.json?orderBy="assignmentId"&equalTo="${assignmentId}"`)
    .then((response) => {
      const theseShifts = response.data;
      const shifts = [];
      Object.keys(theseShifts).forEach((shiftId) => {
        theseShifts[shiftId].id = shiftId;
        shifts.push(theseShifts[shiftId]);
      });
      resolve(shifts);
    })
    .catch((err) => reject(err));
});

const deleteShiftById = (shiftId) => axios.delete(`${baseUrl}/shifts/${shiftId}.json`);

export default { getShiftsByAssignmentId, deleteShiftById };
