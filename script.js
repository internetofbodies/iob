document.getElementById('booking-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  const emailBody = `Name: ${name}\nEmail: ${email}\nDate: ${date}\nTime: ${time}`;

  window.location.href = `mailto:your-email@example.com?subject=Booking Request&body=${encodeURIComponent(emailBody)}`;

  //Clear the form fields
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('date').value = '';
  document.getElementById('time').value = '';

});