import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllEquipJobs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/equipJobs.json`)
    .then((response) => {
      const theEquipJobs = response.data;
      const equipJobs = [];
      if (theEquipJobs) {
        Object.keys(theEquipJobs).forEach((equipJobId) => {
          theEquipJobs[equipJobId].id = equipJobId;
          equipJobs.push(theEquipJobs[equipJobId]);
        });
      }
      resolve(equipJobs);
    })
    .catch((err) => console.error('getDinos broke', reject(err)));
});

const deleteEquipJobById = (equipJobId) => axios.delete(`${baseUrl}/equipjobs/${equipJobId}.json`);

export default { getAllEquipJobs, deleteEquipJobById };
