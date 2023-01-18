import './variables.js';
import './modal.js';
import { onPopupEscKeydown,
  changeGenerals,
  body } from './modal.js';
import { uploadForm } from './variables.js';

const successAlertTemplate = document.querySelector('#success').content.querySelector('.success');
const errorAlertTemplate = document.querySelector('#error').content.querySelector('.error');
const successAlert = successAlertTemplate.cloneNode(true);
const errorAlert = errorAlertTemplate.cloneNode(true);
const successAlertInner = successAlert.querySelector('.success__inner');
const errorAlertInner = errorAlert.querySelector('.success__inner');

/* Render success alert */

const renderSuccessAlert = () => {

  uploadForm.append(successAlert);

  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', closeAllert);

  document.addEventListener('keydown', onPopupEscKeydowAlert);

  changeGenerals();

  successAlert.addEventListener('click', (g) => {

    const withinBoundaries = g.composedPath().includes(successAlertInner);

    if (!withinBoundaries) {
      closeAllert();
    }
  });
};

/* Render error alert */

const renderErrorAlert = () => {

  uploadForm.append(errorAlert);

  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', closeAllert);

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('keydown', onPopupEscKeydowAlert);

  errorAlert.addEventListener('click', (g) => {

    const withinBoundaries = g.composedPath().includes(errorAlertInner);

    if (!withinBoundaries) {
      closeAllert();
    }
  });
};

const renderErrorAlertGallery = () => {

  uploadForm.append(errorAlert);

  const errorTitle = document.querySelector('.error__title');
  const errorButton = document.querySelector('.error__button');

  errorTitle.textContent = 'Не удалось загрузить галерею';
  errorButton.addEventListener('click', () => {
    closeAllert();
    window.location.reload();
  });

  document.removeEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('keydown', onPopupEscKeydowAlert);

  errorAlert.addEventListener('click', (g) => {

    const withinBoundaries = g.composedPath().includes(errorAlertInner);

    if (!withinBoundaries) {
      closeAllert();
    }
  });
};

/* Close alert */

function onPopupEscKeydowAlert (evt) {

  if (evt.key === 'Escape') {

    evt.preventDefault();
    closeAllert();
  }
}

function closeAllert () {

  if (uploadForm.contains(successAlert)) {

    successAlert.remove();
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);

  } else if (uploadForm.contains(errorAlert)) {

    errorAlert.remove();
    document.addEventListener('keydown', onPopupEscKeydown);
  }

  document.removeEventListener('keydown', onPopupEscKeydowAlert);
}

export {
  renderSuccessAlert,
  renderErrorAlert,
  renderErrorAlertGallery,
  successAlert,
  errorAlert
};
