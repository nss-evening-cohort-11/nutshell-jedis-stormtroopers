import utils from '../../helpers/utils';
import staffOverview from './staffOverview';
import vendorsOverview from './vendorsOverview';
import ridesOverview from './ridesOverview';
import equipOverview from './equipOverview';
// eslint-disable-next-line import/no-cycle
import chaosHistoryOverview from './chaosHistoryOverview';

const printOverviewDashboard = () => {
<<<<<<< HEAD
  vendorsData.getVendors().then((vendors) => {
    let domString = '';
    domString += '<div class="container-fluid mt-5">';
    domString += '  <div class="row my-4">';
    domString += '    <div class="col-md-8 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Staff Overview</h2></div>';
    domString += '        <div id="print-unassigned-staff-list-container" class="card-body">';
    domString += '          <h2>Unassigned Staff Members:</h2>';
    domString += '          <ul id="print-unassigned-staff-list">';
    domString += staffOverview.getUnassignedStaff();
    domString += '          </ul>';
    domString += '        </div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '    <div class="col-md-4 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Dinos Overview</h2></div>';
    domString += '        <div class="card-body dash-card"></div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '  </div>';
    domString += '  <div class="row my-4">';
    domString += '    <div class="col-md-4 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Rides Overview</h2></div>';
    domString += '        <div class="card-body dash-card"></div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '    <div class="col-md-4 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Equipment Overview</h2></div>';
    domString += '        <div class="card-body dash-card"></div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '    <div class="col-md-4 my-2">';
    domString += '      <div class="card bg-info">';
    domString += '        <div class="card-header"><h2>Vendors Overview</h2></div>';
    domString += '        <div class="card-body dash-card">';
    vendors.forEach((vendor) => {
      if (vendor.isOpen === false) {
        domString += '<div id="closed-vendor-container">';
        domString += `<p id="${vendor.id}">${vendor.name} is closed!</p>`;
        domString += '</div>';
      }
    });
    domString += '        </div>';
    domString += '      </div>';
    domString += '    </div>';
    domString += '  </div>';
    domString += '</div>';
    utils.printToDom('overview-dashboard', domString);
  });
=======
  let domString = '';
  domString += '<div class="container-fluid mt-5">';
  domString += '  <div class="row my-4">';
  domString += '    <div class="col-md-8 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Staff Missing/Presumed Dead</h2></div>';
  domString += '        <div class="card-body dash-card" id="staff-overview-container"><div class="d-flex flex-row justify-content-around">';
  staffOverview.getKidnappedStaffList();
  domString += '        </div></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Dinos need staffing</h2></div>';
  domString += '        <div class="card-body dash-card" id="dinos-overview-container"></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '  </div>';
  domString += '  <div class="row my-4">';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Rides Broken</h2></div>';
  ridesOverview.getBrokenRidesList();
  domString += '        <div class="card-body dash-card" id="rides-overview-container"></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Equipment Broken</h2></div>';
  equipOverview.getBrokenEquipList();
  domString += '        <div class="card-body dash-card" id="equip-overview-container"></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '    <div class="col-md-4 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Vendors Closed</h2></div>';
  vendorsOverview.getClosedVendorsList();
  domString += '        <div class="card-body dash-card" id="vendors-overview-container">';
  domString += '        </div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '    <div class="col-md-12 my-2">';
  domString += '      <div class="card bg-info">';
  domString += '        <div class="card-header"><h2>Chaos Monkey Activity</h2></div>';
  chaosHistoryOverview.getChaosHistory();
  domString += '        <div class="card-body dash-card" id="chaos-overview-container"></div>';
  domString += '      </div>';
  domString += '    </div>';
  domString += '  </div>';
  domString += '</div>';
  utils.printToDom('overview-dashboard', domString);
>>>>>>> master
};

export default { printOverviewDashboard };
