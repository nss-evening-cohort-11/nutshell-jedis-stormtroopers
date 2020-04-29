/* eslint-disable no-console */
import axios from 'axios';
import apiKeys from '../apiKeys.json';

import staffData from './staffData';
import assignmentsData from './assignmentsData';
import shiftsData from './shiftsData';
import jobTypeData from './jobTypeData';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSingleStaffMemberWithAssignedJobs = (staffId) => new Promise((resolve, reject) => {
  staffData.getSingleStaffMemeber(staffId).then((staffResponse) => {
    const staffMember = staffResponse.data;
    staffMember.id = staffId;
    staffMember.assignedJobs = [];
    assignmentsData.getAssignmentsByStaffId(staffId).then((assignments) => {
      jobTypeData.getJobTypes().then((jobTypes) => {
        assignments.forEach((singleAssignment) => {
          const assignedJobs = jobTypes.filter((job) => job.id === singleAssignment.jobId);
          staffMember.assignedJobs.push(assignedJobs);
        });
        resolve(staffMember);
      });
    });
  })
    .catch((err) => reject(err));
});

const getAllWeeklyShiftsWithSingleStaffMemberJobAssignments = (staffId) => new Promise((resolve, reject) => {
  staffData.getSingleStaffMemeber(staffId).then((staffResponse) => {
    const staffMember = staffResponse.data;
    staffMember.id = staffId;
    shiftsData.getAllShifts().then((shifts) => {
      assignmentsData.getAllAssignments().then((assignments) => {
        jobTypeData.getJobTypes().then((jobTypes) => {
          const finalShiftsBeingWorkedByStaffMember = [];
          shifts.forEach((oneShift) => {
            const shift = { thisStaffMemberJobs: [], ...oneShift };
            const jobAssignmentsOnThisShift = jobTypes.filter((job) => job.shiftId === oneShift.id);
            assignments.forEach((singleAssignment) => {
              jobAssignmentsOnThisShift.forEach((job) => {
                if (singleAssignment.jobId === job.id && singleAssignment.staffId === staffMember.id) {
                  shift.thisStaffMemberJobs.push(singleAssignment);
                }
              });
            });
            finalShiftsBeingWorkedByStaffMember.push(shift);
          });
          staffMember.schedule = finalShiftsBeingWorkedByStaffMember;
          resolve(staffMember);
        });
      });
    });
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

export default {
  deleteStaffAssignmentsAndShifts,
  removeAllJobAssignmentsByAssetId,
  getSingleStaffMemberWithAssignedJobs,
  getAllWeeklyShiftsWithSingleStaffMemberJobAssignments,
};
