import './variables.js';
import {
  picturePreview,
  scaleContol
} from './variables.js';

const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');

const SCALE_STEP = 25;
const CEIL_SCALE = 100;
const FLOOR_SCALE = 25;
const PERCENT = 100;

let scaleValue = CEIL_SCALE;

const scaleBigger = () => {
  if (scaleValue >= FLOOR_SCALE && scaleValue < CEIL_SCALE) {
    scaleValue += SCALE_STEP;
    scaleContol.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${scaleValue / PERCENT})`;
  }
};

const scaleSmaller = () => {
  if (scaleValue > FLOOR_SCALE && scaleValue <= CEIL_SCALE) {
    scaleValue -= SCALE_STEP;
    scaleContol.value = `${scaleValue}%`;
    picturePreview.style.transform = `scale(${scaleValue / PERCENT})`;
  }
};

scaleSmallerBtn.addEventListener('click', scaleSmaller);
scaleBiggerBtn.addEventListener('click', scaleBigger);

const resetScale = () => {
  scaleContol.value = `${CEIL_SCALE}%`;
  picturePreview.style.transform = `scale(${CEIL_SCALE / PERCENT})`;
};

export {resetScale};
