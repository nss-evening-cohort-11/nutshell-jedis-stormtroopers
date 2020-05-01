import assignmentsData from './assignmentsData';
import vendorsData from './vendorsData';
import jobTypeData from './jobTypeData';

const getVendorsWithAssignments = () => new Promise((resolve, reject) => {
  jobTypeData.getJobTypes().then((jobTypesResponse) => {
    assignmentsData.getAllAssignments().then((assignmentsResponse) => {
      vendorsData.getVendors().then((vendorsResponse) => {
        const finalVendors = [];
        vendorsResponse.forEach((vendor) => {
          const newVendor = { jobs: [], ...vendor };
          const vendorJobs = jobTypesResponse.filter((x) => x.assetId === vendor.id);
          vendorJobs.forEach((job) => {
            const newVendorJob = { assignments: [], ...job };
            const jobAssignments = assignmentsResponse.filter((x) => x.jobId === job.id);
            if (jobAssignments.length !== 0) {
              newVendorJob.assignments.push(jobAssignments);
            }
            newVendor.jobs.push(newVendorJob);
          });
          finalVendors.push(newVendor);
        });
        console.log('final vendors', finalVendors);
        resolve(finalVendors);
      });
    });
  })
    .catch((err) => reject(err));
});

export default { getVendorsWithAssignments };
