const throttle = require('lodash.throttle');

const formRef = document.querySelector('.feedback-form');
const LOCAL_STORAGE_PROPERTY = 'feedback-form-state';

const formData = {
  email: '',
  message: '',
};

lookForSavedData();
formRef.addEventListener('input', throttle(onFormInput, 500));
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  if (formData.email !== '' && formData.message !== '') {
    console.log(formData);
    e.target.reset();
    formData.email = '';
    formData.message = '';

    localStorage.removeItem(LOCAL_STORAGE_PROPERTY);
  }
}

function onFormInput() {
  formData.email = formRef.elements.email.value;
  formData.message = formRef.elements.message.value;
  setData();
}

function setData() {
  localStorage.setItem(LOCAL_STORAGE_PROPERTY, JSON.stringify(formData));
}

function fillIn() {
  const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROPERTY));
  formData.email = savedData.email;
  formData.message = savedData.message;
  formRef.elements.email.value = savedData.email;
  formRef.elements.message.value = savedData.message;
}

function lookForSavedData() {
  if (localStorage.getItem(LOCAL_STORAGE_PROPERTY) === null) return;
  fillIn();
}
