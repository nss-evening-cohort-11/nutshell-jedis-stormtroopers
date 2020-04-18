import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getEquips = () => new Promise((resolution, rejection) => {
  axios.get(`${baseUrl}/equipment.json`)
    .then((responseFromBackEnd) => {
      const theEquipment = responseFromBackEnd.data;
      const equipmentContainer = [];
      Object.keys(theEquipment).forEach((equipmentId) => {
        theEquipment[equipmentId].id = equipmentId;
        equipmentContainer.push(theEquipment[equipmentId]);
      });
      resolution(equipmentContainer);
    })
    .catch((err) => rejection(err));
});

const deleteEquipment = (equipmentId) => axios.delete(`${baseUrl}/equipment/${equipmentId}.json`);

export default {
  getEquips,
  deleteEquipment,
};
