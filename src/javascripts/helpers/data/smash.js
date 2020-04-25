import assignData from './assignData';
import shiftsData from './shiftsData';

const completelyRemoveTask = (randEquipId) => new Promise((resolve, reject) => {
  assignData.getAssignments()
    .then((assignResponse) => {
      const assignments = assignResponse;
      shiftsData.getShifts()
        .then((shiftsResponse) => {
          const shifts = shiftsResponse;
          assignments.forEach((oneAssignment) => {
            if (oneAssignment.entityId === randEquipId) {
              shifts.forEach((oneShift) => {
                if (oneShift.assignmentId === oneAssignment.id) {
                  shiftsData.deleteShift(oneShift.id);
                  assignData.deleteAssignment(oneAssignment.id);
                  console.log('shiftsData', assignments);
                  console.log('assignData', shifts);
                }
              });
            }
          });
          resolve();
        });
    })
    .catch((err) => reject(err));
});

export default { completelyRemoveTask };
