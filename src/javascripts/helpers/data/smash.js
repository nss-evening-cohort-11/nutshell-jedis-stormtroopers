import axios from 'axios';
import apiKeys from '../apiKeys.json';

import assignmentsData from './assignmentsData';
import shiftsData from './shiftsData';
import jobTypeData from './jobTypeData';
import equipJobsData from './equipJobsData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const completelyRemoveTask = (randEquipId) => new Promise((resolve, reject) => {
  assignmentsData.getAllAssignments()
    .then((assignResponse) => {
      equipJobsData.getAllEquipJobs()
        .then((equipJobsResponse) => {
          const assignments = assignResponse;
          const equipJobs = equipJobsResponse;
          assignments.forEach((assignment) => {
            equipJobs.forEach((equipJob) => {
              if (randEquipId === equipJob.equipId) {
                if (equipJob.jobId === assignment.jobId) {
                  equipJobsData.deleteEquipJobById(equipJob.id);
                  assignmentsData.deleteAssignmentById(assignment.id);
                  console.log('equipJob', equipJob);
                  console.log('assignment', assignment);
                }
              }
            });
          });
          console.log('assignments', assignments);
          console.log('equipJobs', equipJobs);
        });
      resolve();
    })
    .catch((err) => reject(err));
});

const removeAllJobAssignmentsByAssetId = (assetId) => new Promise((resolve, reject) => {
  jobTypeData.getJobTypesByAssetId(assetId)
    .then((jobTypes) => {
      jobTypes.forEach((singleJobType) => {
        const jobTypeId = singleJobType.id;
        assignmentsData.getAssignmentsByJobTypeId(jobTypeId)
          .then((assignments) => {
            assignments.forEach((singleAssignment) => {
              const assignmentId = singleAssignment.id;
              assignmentsData.deleteAssignmentById(assignmentId);
            });
          });
      });
      resolve();
    })
    .catch((err) => reject(err));
});

const deleteStaffAssignmentsAndShifts = (staffMemberId) => new Promise((resolve, reject) => {
  assignmentsData.getAllAssignments()
    .then((assignmentsArray) => {
      const assignmentsToRemove = assignmentsArray.filter((a) => a.staffId === staffMemberId);
      assignmentsToRemove.forEach((item) => {
        axios.delete(`${baseUrl}/assignments/${item.id}.json`);
        shiftsData.getAllShifts()
          .then((shiftsArray) => {
            const deleteThisShift = shiftsArray.find((shift) => shift.assignmentId === item.id);
            axios.delete(`${baseUrl}/shifts/${deleteThisShift.id}.json`);
          });
      });
      resolve();
    })
    .catch((err) => console.error('problem with deleting assignments for staff', reject(err)));
});

export default { deleteStaffAssignmentsAndShifts, removeAllJobAssignmentsByAssetId, completelyRemoveTask };
