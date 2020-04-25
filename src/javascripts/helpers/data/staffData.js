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

const getAllShifts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/shifts.json`)
    .then((response) => {
      const theShifts = response.data;
      const shifts = [];
      if (theShifts) {
        Object.keys(theShifts).forEach((shiftId) => {
          theShifts[shiftId].id = shiftId;
          shifts.push(theShifts[shiftId]);
        });
      }
      resolve(shifts);
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
  getAllAssignments()
    .then((assignmentsArray) => {
      const assignmentsToRemove = assignmentsArray.filter((a) => a.staffId === staffMemberId);
      assignmentsToRemove.forEach((item) => {
        axios.delete(`${baseUrl}/assignments/${item.id}.json`);
        getAllShifts()
          .then((shiftsArray) => {
            const deleteThisShift = shiftsArray.find((shift) => shift.assignmentId === item.id);
            axios.delete(`${baseUrl}/shifts/${deleteThisShift.id}.json`);
          });
      });
      resolve();
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
