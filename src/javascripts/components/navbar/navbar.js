const navbarEvents = (e) => {
  const btnId = e.target.closest('.btn').id;
  if (btnId === 'nav-dino-btn') {
    $('#dino-dashboard').removeClass('hide');
    $('#overview-dashboard, #staff-dashboard, #rides-dashboard, #equipment-dashboard, #vendors-dashboard').addClass('hide');
  } else if (btnId === 'nav-staff-btn') {
    $('#staff-dashboard').removeClass('hide');
    $('#overview-dashboard, #dino-dashboard, #rides-dashboard, #equipment-dashboard, #vendors-dashboard').addClass('hide');
  } else if (btnId === 'nav-rides-btn') {
    $('#rides-dashboard').removeClass('hide');
    $('#overview-dashboard, #dino-dashboard, #staff-dashboard, #equipment-dashboard, #vendors-dashboard').addClass('hide');
  } else if (btnId === 'nav-equipment-btn') {
    $('#equipment-dashboard').removeClass('hide');
    $('#overview-dashboard, #dino-dashboard, #rides-dashboard, #staff-dashboard, #vendors-dashboard').addClass('hide');
  } else if (btnId === 'nav-vendors-btn') {
    $('#vendors-dashboard').removeClass('hide');
    $('#overview-dashboard, #dino-dashboard, #rides-dashboard, #equipment-dashboard, #staff-dashboard').addClass('hide');
  } else if (btnId === 'nav-home-btn') {
    $('#overview-dashboard').removeClass('hide');
    $('#vendors-dashboard, #dino-dashboard, #rides-dashboard, #equipment-dashboard, #staff-dashboard').addClass('hide');
  }
};

export default { navbarEvents };
