import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getRides = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/rides.json`)
    .then((response) => {
      const ridesResponse = response.data;
      const rides = [];
      if (ridesResponse) {
        Object.keys(ridesResponse).forEach((rideId) => {
          ridesResponse[rideId].id = rideId;
          rides.push(ridesResponse[rideId]);
        });
      }
      resolve(rides);
    })
    .catch((err) => reject(err));
});

const deleteRide = (rideId) => axios.delete(`${baseUrl}/rides/${rideId}.json`);

const addRide = (newRide) => axios.post(`${baseUrl}/rides.json`, newRide);

const updateRide = (rideId, modifiedRide) => axios.put(`${baseUrl}/rides/${rideId}.json`, modifiedRide);

const getSingleRide = (rideId) => axios.get(`${baseUrl}/rides/${rideId}.json`);

const breakRide = (rideId) => axios.patch(`${baseUrl}/rides/${rideId}.json`, { isBroken: true });

export default {
  getRides,
  deleteRide,
  addRide,
  updateRide,
  getSingleRide,
  breakRide,
};
