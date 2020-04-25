import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getAllAssignments = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/assignments.json`)
    .then((response) => {
      const theAssignments = response.data;
      const assignments = [];
      if (theAssignments) {
        Object.keys(theAssignments).forEach((assignmentId) => {
          theAssignments[assignmentId].id = assignmentId;
          assignments.push(theAssignments[assignmentId]);
        });
      }
      resolve(assignments);
    })
    .catch((err) => console.error('getStaff broke', reject(err)));
});

const getStaffs = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/staff.json`)
    .then((response) => {
      const theStaff = response.data;
      const staff = [];
      if (theStaff) {
        Object.keys(theStaff).forEach((staffId) => {
          theStaff[staffId].id = staffId;
          staff.push(theStaff[staffId]);
        });
      }
      resolve(staff);
    })
    .catch((err) => console.error('getStaff broke', reject(err)));
});

const deleteStaffAssignmentsAndShifts = (staffMemberId) => new Promise((resolve, reject) => {
  getStaffs()
    .then((staffArray) => {
      const kidnappedStaffMember = staffArray.find((x) => x.id === staffMemberId); // find the staff member who was kidnapped, by Id
      getAllAssignments()
        .then((assignmentsArray) => {
          const removeThisAssignment = assignmentsArray.find((a) => a.staffId === staffMemberId);
          if (removeThisAssignment) {
            // axios.delete(`${baseUrl}/assignments/${removeThisAssignment}.json`);
            console.error('delete axios:', `${baseUrl}/assignments/${removeThisAssignment}.json`);
          } else {
            console.error('no assigments to delete');
          }
          resolve(console.error('remove this:', removeThisAssignment));
        });
      resolve(console.error('kidnapped:', kidnappedStaffMember));
    })
    .catch((err) => console.error('problem with deleting assignments for staff', reject(err)));
});

const deleteStaff = (staffId) => axios.delete(`${baseUrl}/staff/${staffId}.json`);

const addStaff = (newStaff) => axios.post(`${baseUrl}/staff.json`, newStaff);

const updateStaff = (staffId, modifiedStaff) => axios.put(`${baseUrl}/staff/${staffId}.json`, modifiedStaff);

const getSingleStaffMemeber = (staffId) => axios.get(`${baseUrl}/staff/${staffId}.json`);

const kidnapStaff = (staffId) => axios.patch(`${baseUrl}/staff/${staffId}.json`, { isKidnapped: true });


export default {
  deleteStaff,
  addStaff,
  updateStaff,
  getSingleStaffMemeber,
  getStaffs,
  kidnapStaff,
  deleteStaffAssignmentsAndShifts,
};
