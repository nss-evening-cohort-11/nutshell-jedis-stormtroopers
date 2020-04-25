import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

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

const addEventToChaosHistory = () => {
  console.log('add something to chaos history');
};

export default { getChaosEventsByType, addEventToChaosHistory };
