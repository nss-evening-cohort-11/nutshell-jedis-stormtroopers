import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getDinos = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/dinos.json`)
    .then((response) => {
      const theDinos = response.data;
      const dinos = [];
      if (theDinos) {
        Object.keys(theDinos).forEach((dinoId) => {
          theDinos[dinoId].id = dinoId;
          dinos.push(theDinos[dinoId]);
        });
      }
      resolve(dinos);
    })
    .catch((err) => console.error('getDinos broke', reject(err)));
});

const deleteDino = (dinoId) => axios.delete(`${baseUrl}/dinos/${dinoId}.json`);

const addDino = (newDino) => axios.post(`${baseUrl}/dinos/${newDino}.json`);

const updateDino = (dinoId, modifiedDino) => axios.put(`${baseUrl}/dinos/${dinoId}.json`, modifiedDino);

const getSingleDino = (dinoId) => axios.get(`${baseUrl}/dinos/${dinoId}.json`);

export default {
  deleteDino,
  addDino,
  updateDino,
  getSingleDino,
  getDinos,
};
