const throttle = require('lodash.throttle');

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};
const formData = {
    email:'',
    message:'',
};
testForSavedData();
setData();
refs.form.addEventListener('input', throttle(onFormInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
    e.target.reset();
}

function onFormInput({ target }) {
  if (target.nodeName === 'INPUT') {
    formData.email = target.value;
  } else {
    formData.message = target.value;
  }
      setData();
}

function setData() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function fillIn() {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
 formData.email = savedData.email;
  formData.message = savedData.message;
  refs.input.value = savedData.email;
  refs.textarea.value = savedData.message;
}

function testForSavedData() {
  if (localStorage.getItem('feedback-form-state') === null) return;
  fillIn();
}
