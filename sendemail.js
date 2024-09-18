function sendMail() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  // Check if any field is empty
  if (!name || !email || !message) {
      alert('Please fill out all fields before submitting.');
      return;
  }

  var templateParams = {
      name: name,
      email: email,
      message: message
  };

  emailjs.send('service_qufwwvn', 'template_vrq2mpc', templateParams)
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          // Clear the form fields
          document.getElementById('name').value = '';
          document.getElementById('email').value = '';
          document.getElementById('message').value = '';
          // Show success message
          alert('Email sent successfully!');
      }, function(error) {
          console.log('FAILED...', error);
          // Show error message
          alert('Failed to send email. Please try again.');
      });
}
