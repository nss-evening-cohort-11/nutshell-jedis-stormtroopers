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

const addEquipment = (newEquipment) => axios.post(`${baseUrl}/equipment.json`, newEquipment);

const updateEquipment = (equipmentId, modifiedEquipment) => axios.put(`${baseUrl}/equipment/${equipmentId}.json`, modifiedEquipment);

const getSingleEquipment = (equipmentId) => axios.get(`${baseUrl}/equipment/${equipmentId}.json`);

const breakEquipment = (equipmentId) => axios.patch(`${baseUrl}/equipment/${equipmentId}.json`, { isBroken: true });

export default {
  getEquips,
  deleteEquipment,
  addEquipment,
  updateEquipment,
  getSingleEquipment,
  breakEquipment,
};
