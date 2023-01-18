import './variables.js';
import './effects.js';
import './scale.js';
import './validation.js';
import './modal.js';
import './alerts.js';
import './api.js';
import { resetEffects } from './effects.js';
import { resetScale } from './scale.js';
import { sendData } from './api.js';
import { uploadForm } from './variables.js';
import { pristine,
  hashTagsField
} from './validation.js';
import { closeFormModal } from './modal.js';
import {
  renderSuccessAlert,
  renderErrorAlert
} from './alerts.js';

const submitButton = uploadForm.querySelector('.img-upload__submit');
const textDescription = uploadForm.querySelector('.text__description');

/* Block form-submit button */

const blockButton = () => {

  submitButton.classList.add('img-upload__submit--disabled');
  submitButton.disabled = true;
};

const unblockButton = () => {

  submitButton.classList.remove('img-upload__submit--disabled');
  submitButton.disabled = false;
};

const blockButtonOnFieldInput = () => {

  const isValid = pristine.validate();

  if (isValid) {

    unblockButton();
  } else if (!isValid) {

    blockButton();
  }
};

/* Submit form and send to the server */

const setFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {

    evt.preventDefault();
    blockButton();

    const isValid = pristine.validate();

    if(isValid) {

      sendData(
        () => onSuccess(renderSuccessAlert()),
        () => renderErrorAlert(unblockButton()),
        new FormData(evt.target)
      );
    }
  });
};

/* Clear form */

const clearForm = () => {
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffects();
  unblockButton();
};

setFormSubmit(closeFormModal);

textDescription.addEventListener('input', blockButtonOnFieldInput);
hashTagsField.addEventListener('input', blockButtonOnFieldInput);

export {
  setFormSubmit,
  clearForm,
  textDescription
};
