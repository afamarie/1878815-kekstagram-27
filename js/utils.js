/* Get random positive integer from array */

function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));


  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

/* Set timeout and reduce debounce */

function debounce (callback, timeoutDelay) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

/* Hide some elements from choosen array */

const hideElements = (arr, count) => {

  for (let i = count; i < arr.length; i++ ) {
    arr[i].classList.add('hidden');
  }
};

/* Show some elements from choosen array */

const showElements = (arr, count) => {

  const currentArr = arr;

  for (let i = 0; i < count && i < currentArr.length; i++ ) {

    currentArr[i].classList.remove('hidden');
  }
};

/* Hide element */

const hideElement = (el) => {

  el.classList.add('hidden');
};

/* Show element */

const showElement = (el) => {

  el.classList.remove('hidden');
};

export {
  getRandomPositiveInteger,
  debounce,
  hideElements,
  showElements,
  hideElement,
  showElement
};
