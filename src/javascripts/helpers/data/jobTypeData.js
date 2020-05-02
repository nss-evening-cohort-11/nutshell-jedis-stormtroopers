import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getJobTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/jobTypes.json`)
    .then((response) => {
      const allJobTypes = response.data;
      const jobTypes = [];
      Object.keys(allJobTypes).forEach((jobTypeId) => {
        allJobTypes[jobTypeId].id = jobTypeId;
        jobTypes.push(allJobTypes[jobTypeId]);
      });
      resolve(jobTypes);
    })
    .catch((err) => reject(err));
});

const getJobTypesByAssetId = (assetId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/jobTypes.json?orderBy="assetId"&equalTo="${assetId}"`)
    .then((response) => {
      const theseJobTypes = response.data;
      const jobTypes = [];
      Object.keys(theseJobTypes).forEach((jobTypeId) => {
        theseJobTypes[jobTypeId].id = jobTypeId;
        jobTypes.push(theseJobTypes[jobTypeId]);
      });
      resolve(jobTypes);
    })
    .catch((err) => reject(err));
});

const getJobTypesByShiftId = (shiftId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/jobTypes.json?orderBy="shiftId"&equalTo="${shiftId}"`)
    .then((response) => {
      const theseJobTypes = response.data;
      const jobTypes = [];
      Object.keys(theseJobTypes).forEach((jobTypeId) => {
        theseJobTypes[jobTypeId].id = jobTypeId;
        jobTypes.push(theseJobTypes[jobTypeId]);
      });
      resolve(jobTypes);
    })
    .catch((err) => reject(err));
});

// const addSingleJob = (jobObect) => axios.post(`${baseUrl}/jobTypes.json`, jobObect);

const addJobsForNewEntity = (numOfJobs, entityName) => {
  console.error('add this many jobs:', numOfJobs);
  console.error('to this entity:', entityName);
  for (let i = 0; i < numOfJobs; i += 1) {
    console.log('add job, value of i:', i);
  }
};

export default {
  getJobTypes,
  getJobTypesByAssetId,
  getJobTypesByShiftId,
  addJobsForNewEntity,
};
