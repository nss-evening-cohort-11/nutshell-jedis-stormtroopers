import assignmentsData from './assignmentsData';
import shiftsData from './shiftsData';

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

export default { removeAllAssignmentsAndShiftsByEntityId };
