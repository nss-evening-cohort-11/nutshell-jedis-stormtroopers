import axios from 'axios';
import apiKeys from '../apiKeys.json';

import ridesData from './ridesData';
import vendorsData from './vendorsData';
import dinoData from './dinoData';

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

const addSingleJob = (jobObect) => axios.post(`${baseUrl}/jobTypes.json`, jobObect);

const addJobsForNewRide = (numOfJobs, rideName) => {
  for (let i = 0; i < numOfJobs; i += 1) {
    ridesData.getRideIdByName(rideName)
      .then((response) => {
        const newJob = {
          assetId: response,
          shiftId: `shift${i + 1}`,
          name: 'Ride Attendant',
        };
        addSingleJob(newJob);
      });
  }
};

const addJobsForNewVendor = (numOfJobs, vendorName) => {
  for (let i = 0; i < numOfJobs; i += 1) {
    vendorsData.getVendorIdByName(vendorName)
      .then((response) => {
        const newJob = {
          assetId: response,
          shiftId: `shift${i + 1}`,
          name: 'Vendor Attendant',
        };
        addSingleJob(newJob);
      });
  }
};

const addJobsForNewDino = (numOfJobs, dinoName) => {
  for (let i = 0; i < numOfJobs; i += 1) {
    dinoData.getDinoIdByName(dinoName)
      .then(() => {
        let counter = 0;
        if (i < 6) {
          counter = i + 1;
        } else {
          counter = i - i + 1;
        }
        const newJob = {
          // assetId: response,
          shiftId: counter,
          // name: 'Dino Attendant',
        };
        console.log('new job:', newJob);
        // addSingleJob(newJob);
      });
  }
};

export default {
  getJobTypes,
  getJobTypesByAssetId,
  getJobTypesByShiftId,
  addJobsForNewRide,
  addJobsForNewVendor,
  addJobsForNewDino,
};
