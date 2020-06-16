$(document).ready(function() {
  const getBtn = document.getElementById('get-btn');
  getBtn.addEventListener('click', validateLogin);

  function validateLogin() {
    var userMail = document.getElementById('login-username');
    if (userMail.value == 'juanpruebas@cev.com' || userMail.value == 'pacopruebas@cev.com' || userMail.value == 'anapruebas@cev.com' || userMail.value == 'cristinapruebas@cev.com' || userMail.value == 'evapruebas@cev.com' || userMail.value == 'josepruebas@cev.com' || userMail.value == 'luispruebas@cev.com') {
      document.cookie = `username=${userMail.value}; path=/index`;
      window.location.href = "/index";
    } else {
      alert("Introduce un mail válido");
    }
  }
});