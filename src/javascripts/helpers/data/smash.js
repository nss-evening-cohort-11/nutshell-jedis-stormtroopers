import axios from 'axios';
import apiKeys from '../apiKeys.json';

import assignmentsData from './assignmentsData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const removeAllJobsAndAssignmentsByEntityId = (entityId) => new Promise((resolve, reject) => {
  assignmentsData.getRideAssignmentsByEntityId(entityId)
    .then((assignments) => {
      assignments.forEach((singleAssignment) => {
        const assignmentId = singleAssignment.id;
        assignmentsData.deleteAssignmentById(assignmentId);
      });
      resolve();
    })
    .catch((err) => reject(err));
});

const deleteStaffAssignments = (staffMemberId) => new Promise((resolve, reject) => {
  assignmentsData.getAllAssignments()
    .then((assignmentsArray) => {
      const assignmentsToRemove = assignmentsArray.filter((a) => a.staffId === staffMemberId);
      assignmentsToRemove.forEach((item) => {
        axios.delete(`${baseUrl}/assignments/${item.id}.json`);
      });
      resolve();
    })
    .catch((err) => console.error('problem with deleting assignments for staff', reject(err)));
});

export default { removeAllJobsAndAssignmentsByEntityId, deleteStaffAssignments };
