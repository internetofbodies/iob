function sendMail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const templateParams = {
    name: name,
    email: email,
    message: message,
  };

  emailjs.send("service_qufwwvn", "template_vrq2mpc", templateParams)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      alert("Email sent successfully!");
    }, function(error) {
      console.log('FAILED...', error);
      alert("Failed to send email.");
    });
}