import axios from 'axios';
import apiKeys from '../apiKeys.json';

import assignmentsData from './assignmentsData';
import shiftsData from './shiftsData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const completelyRemoveTask = (randEquipId) => new Promise((resolve, reject) => {
  assignmentsData.getAllAssignments()
    .then((assignResponse) => {
      const assignments = assignResponse;
      shiftsData.getAllShifts()
        .then((shiftsResponse) => {
          const shifts = shiftsResponse;
          assignments.forEach((oneAssignment) => {
            if (oneAssignment.entityId === randEquipId) {
              shifts.forEach((oneShift) => {
                if (oneShift.assignmentId === oneAssignment.id) {
                  shiftsData.deleteShiftById(oneShift.id);
                  assignmentsData.deleteAssignmentById(oneAssignment.id);
                }
              });
            }
          });
          resolve();
        });
    })
    .catch((err) => reject(err));
});

const removeAllAssignmentsAndShiftsByEntityId = (entityId) => new Promise((resolve, reject) => {
  assignmentsData.getRideAssignmentsByEntityId(entityId)
    .then((assignments) => {
      assignments.forEach((singleAssignment) => {
        const assignmentId = singleAssignment.id;
        shiftsData.getShiftsByAssignmentId(assignmentId)
          .then((shifts) => {
            shifts.forEach((singleShift) => {
              const shiftId = singleShift.id;
              shiftsData.deleteShiftById(shiftId);
            });
          });
        assignmentsData.deleteAssignmentById(assignmentId);
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

export default { removeAllAssignmentsAndShiftsByEntityId, deleteStaffAssignmentsAndShifts, completelyRemoveTask };
