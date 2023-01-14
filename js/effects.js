import './variables.js';
import {picturePreview} from './variables.js';

const pictureEffects = document.querySelector('.effects__list');
const valueContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

/* Effects data */

const effects = {
  none: {
    filter: 'none',
    step: 1,
    min: 0,
    max: 100,
    unit: ''
  },

  chrome: {
    filter: 'grayscale',
    step: 0.1,
    min: 0,
    max: 1,
    unit: ''
  },

  heat: {
    filter: 'brightness',
    step: 0.1,
    min: 1,
    max: 3,
    unit: ''
  },

  sepia: {
    filter: 'sepia',
    step: 0.1,
    min: 0,
    max: 1,
    unit: ''
  },

  marvin: {
    filter: 'invert',
    step: 1,
    min: 0,
    max: 100,
    unit: '%'
  },

  phobos: {
    filter: 'blur',
    step: 0.1,
    min: 0,
    max: 3,
    unit: 'px'
  }
};

let currentEffect;
const DEFAULT_EFFECT = effects.none;
currentEffect = DEFAULT_EFFECT;

/* Slider options */

const updateSlider = () => {
  if (currentEffect === DEFAULT_EFFECT) {
    valueContainer.style.display = 'none';
  }
  if (currentEffect !== DEFAULT_EFFECT) {
    sliderElement.classList.remove('hidden');
    valueContainer.style.display = 'block';
  }
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: currentEffect.min,
      max: currentEffect.max,
    },
    start: currentEffect.max,
    step: currentEffect.step,
    connect: 'lower',
  });
};

noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

updateSlider();

sliderElement.noUiSlider.on('update', () => {
  if (currentEffect === DEFAULT_EFFECT) {
    sliderElement.classList.add('hidden');
  }
  valueElement.value = sliderElement.noUiSlider.get();
});

/* Effects options */

const changeEffect = (evt) => {
  currentEffect = effects[evt.target.value];
  updateSlider();
};

const applyEffect = () => {
  picturePreview.style.filter = 'none';
  if (currentEffect === DEFAULT_EFFECT) {
    return;
  }
  const sliderValue = sliderElement.noUiSlider.get();
  picturePreview.style.filter = `${currentEffect.filter}(${sliderValue}${currentEffect.unit})`;
};

const resetEffects = () => {
  currentEffect = DEFAULT_EFFECT;
  updateSlider();
};

pictureEffects.addEventListener('change', changeEffect);
sliderElement.noUiSlider.on('update', applyEffect);

export {resetEffects};
