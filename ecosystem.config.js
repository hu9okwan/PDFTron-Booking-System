module.exports = {
  deploy : {
    production : {
      user : 'ec2-user',
      host : '18.237.95.237',
      ssh_options: 'IdentityFile=/Users/dfelix/.ssh/pdftron-web-metrics-dashboard.cer',
      ref  : 'origin/deploy',
      repo : 'git@github.com-office-booking-system:ericchanko/PDFTron-Internal-Booking.git',
      path : '/home/ec2-user/officeBookingSystem',
      'post-deploy' : 'npm install && cp /home/ec2-user/.env.local.office-booking-system /home/ec2-user/officeBookingSystem/current/.env && npm run build && pm2 reload officeBookingSystem'
    }
  }
};
