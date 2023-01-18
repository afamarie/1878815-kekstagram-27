import './variables.js';
import { uploadForm } from './variables.js';


const hashTagsField = uploadForm.querySelector('.text__hashtags');

const MAX_LENGTH = 140;
const MAX_QUANTITY = 5;
const MAX_HASHTAG_LENGTH = 20;
const REG_EXPRESSION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

/* Pristine configuration */

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

/* Text comment */

/* Validate comment's length */
const validateComment = (string) => string.length <= MAX_LENGTH;

pristine.addValidator(
  uploadForm.querySelector('.text__description'),
  validateComment,
  `Не более ${MAX_LENGTH} символов`
);

/* Hashtags */

/* Validate quantity of hash-tags */

const validateQuantity = (value) => {
  const arr = value.split(' ');
  return arr.length <= MAX_QUANTITY;
};

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  validateQuantity,
  `Не больше ${MAX_QUANTITY} хэш-тегов`
);

/* Validate length of a hash-tag */

const validateLength = (value) => {
  const arr = value.split(' ');
  return arr.every((el) => el.length <= MAX_HASHTAG_LENGTH);
};

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  validateLength,
  `Хэш-тег должен сожержать не более ${MAX_HASHTAG_LENGTH} символов`,
  1,
  true
);

/* Validate symbols of a hash-tag */

const validateExpression = (value) => {

  if (value === '') {
    return true;
  } else {
    const arr = value.split(' ');
    return arr.every((el) => REG_EXPRESSION.test(el));
  }
};

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  validateExpression,
  'Хэш-тег должен начинаться с #, состоять только из букв и цифр',
  1,
  false
);

/* Validate hash-tags uniqueness*/

const validateUniqueness = (value) => {

  const arr = value.toLowerCase().split(' ');
  const uniqueArr = new Set(arr);

  return arr.length === uniqueArr.size;
};

pristine.addValidator(
  uploadForm.querySelector('.text__hashtags'),
  validateUniqueness,
  'Хэш-тег не должен повторяться',
  1,
  false
);

export {
  pristine,
  hashTagsField };
