const scriptURL = 'https://script.google.com/a/macros/amormarketingla.com/s/AKfycbxpUmrGx9SarCAfVaOTe3JFrUpaikoHKa2UzdM2tMTSzXdSL7J4X_SVOIImlRolICTE/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})