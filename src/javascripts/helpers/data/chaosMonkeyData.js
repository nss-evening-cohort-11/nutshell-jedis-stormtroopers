import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;
const moment = require('moment');

const getChaosEventsByType = (eventFilterType) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/chaosMonkeyEvents.json`)
    .then((response) => {
      const allTheEvents = response.data;
      const eventsArray = [];
      if (allTheEvents) {
        Object.keys(allTheEvents).forEach((eventId) => {
          allTheEvents[eventId].id = eventId;
          eventsArray.push(allTheEvents[eventId]);
        });
      }
      const filteredEvents = eventsArray.filter((event) => event.eventType === eventFilterType);
      resolve(filteredEvents);
    })
    .catch((err) => console.error('problem with getChaosEventsByType', reject(err)));
});

const postChaosEvent = (event) => axios.post(`${baseUrl}/chaosMonkeyEvents.json`, event);

const addEventToChaosHistory = (eventType, entityId) => {
  console.error('inside addEventToHistory... event Type, entity Id:', eventType, entityId);
  if (eventType === 'kidnap') {
    const newEvent = {
      affectedEntityId: entityId,
      eventType: 'kidnap',
      timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
    };
    postChaosEvent(newEvent);

    console.log('add something to chaos history:', newEvent);
  }
};

export default { getChaosEventsByType, addEventToChaosHistory };
