import './variables.js';
import './form.js';
import './user-picture.js';
import './big-picture.js';
import './gallery.js';
import './alerts.js';
import './validation.js';
import { hashTagsField } from './validation.js';
import { successAlert } from './alerts.js';
import { gallery } from './gallery.js';
import {
  renderPicture,
  pictureOverlay,
  clearPicture } from './big-picture.js';
import { clearImage } from './user-picture.js';
import {
  clearForm,
  textDescription } from './form.js';
import { uploadForm } from './variables.js';

const body = document.querySelector('body');
const formModal = body.querySelector('.img-upload__overlay');
const closeElement = uploadForm.querySelector('.img-upload__cancel');
const pictureField = uploadForm.querySelector('#upload-file');
const pictureCloseBtn = pictureOverlay.querySelector('.big-picture__cancel');
const pictureWrapper = formModal.querySelector('.img-upload__wrapper');
const bigPictureWrapper = document.querySelector('.big-picture__preview');

/* General options */

const changeGenerals = () => {
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const defaultGenerals = () => {

  if (!uploadForm.contains(successAlert)) {
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

function onPopupEscKeydown (evt) {

  if (evt.key === 'Escape') {
    evt.preventDefault();

    if (formModal) {
      closeFormModal();

    } if (!pictureOverlay.classList.contains('hidden')) {
      closeBigPicture();
    }
  }
}

/* Upload form options */

function openFormModal () {

  formModal.classList.remove('hidden');
  changeGenerals();

  formModal.addEventListener('click', (g) => {

    const withinBoundaries = g.composedPath().includes(pictureWrapper);

    if (!withinBoundaries) {
      closeFormModal();
    }
  });
}

function closeFormModal () {

  formModal.classList.add('hidden');
  defaultGenerals();
  clearForm();
  clearImage();
}

/* Big picture options */

function openBigPicture (evt) {

  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    pictureOverlay.classList.remove('hidden');
    renderPicture(evt);
    changeGenerals();
  }

  pictureOverlay.addEventListener('click', (g) => {

    const withinBoundaries = g.composedPath().includes(bigPictureWrapper);

    if (!withinBoundaries) {
      closeBigPicture();
    }
  });
}

function closeBigPicture () {

  pictureOverlay.classList.add('hidden');
  clearPicture();
  defaultGenerals();
}

/* Form listeners */

closeElement.addEventListener('click', closeFormModal);
pictureField.addEventListener('change', openFormModal);

textDescription.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPopupEscKeydown);
});

textDescription.addEventListener('blur', () => {
  document.addEventListener('keydown', onPopupEscKeydown);
});

hashTagsField.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPopupEscKeydown);
});

hashTagsField.addEventListener('blur', () => {
  document.addEventListener('keydown', onPopupEscKeydown);
});

/* Picture listeners */

gallery.addEventListener('click', openBigPicture);
pictureCloseBtn.addEventListener('click', closeBigPicture);

export {
  closeFormModal,
  onPopupEscKeydown,
  changeGenerals,
  defaultGenerals,
  openFormModal,
  body,
  pictureWrapper
};
