const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const action = form.action;
    fetch(action, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => {
      setTimeout(() => {
        window.location.href = 'contact.html';
      }, 1000);
    })
    .catch(error => console.error('Error!', error.message));
  });
}
