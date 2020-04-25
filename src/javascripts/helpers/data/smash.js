// import equipData from './equipData';
import assignData from './assignData';
import shiftsData from './shiftsData';

const completelyRemoveTask = (randEquipId) => new Promise((resolve, reject) => {
  assignData.getAssignments()
    .then((response) => {
      const assignments = response;
      console.error('assignments', assignments);
      console.error('randEquipId', randEquipId);
      shiftsData.getShifts()
        .then((resp) => {
          const shifts = resp;
          console.error('shifts', shifts);
        });
    })
    .catch((err) => reject(err));
});

export default { completelyRemoveTask };
