import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAssignments = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/assignments.json`)
    .then((response) => {
      const theAssignments = response.data;
      const assignments = [];
      if (theAssignments) {
        Object.keys(theAssignments).forEach((assignmentId) => {
          theAssignments[assignmentId].id = assignmentId;
          assignments.push(theAssignments[assignmentId]);
        });
      }
      resolve(assignments);
    })
    .catch((err) => reject(err));
});

const deleteAssignment = (assignmentId) => axios.delete(`${baseUrl}/assignments/${assignmentId}.json`);

export default { getAssignments, deleteAssignment };
