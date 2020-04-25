import assignmentsData from './assignmentsData';

const removeAllAssignmentsByEntityId = (entityId) => new Promise((resolve, reject) => {
  assignmentsData.getRideAssignmentsByEntityId(entityId)
    .then((assignments) => {
      assignments.forEach((singleAssignment) => {
        const assignmentId = singleAssignment.id;
        assignmentsData.deleteAssignmentById(assignmentId);
      });
    })
    .catch((err) => reject(err));
});

export default { removeAllAssignmentsByEntityId };
