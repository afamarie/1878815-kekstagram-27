import './variables.js';
import { uploadForm } from './variables.js';

/* Validate upload picture form */

const MAX_LENGTH = 140;

const pristine = new Pristine (uploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text--error'
});

const validateComment = (string) => string.length <= MAX_LENGTH;

pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  validateComment,
  'Не более 140 символов'
);

export { pristine };
