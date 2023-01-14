import './gallery.js';
import './api.js';
import './utils.js';
import { debounce, getRandomPositiveInteger } from './utils.js';
import { renderGallery, clearGallery } from './gallery.js';
import { defaultList } from './api.js';

const filterForm = document.querySelector('.img-filters__form');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

const MAX_COUNT = 10;
const RENDER_DELAY = 500;

/* Change filter buttons states */

const filterToggle = (choosen) => {

  const activeBtn = document.querySelector('.img-filters__button--active');

  activeBtn.classList.remove('img-filters__button--active');
  choosen.classList.add('img-filters__button--active');
};

/* Apply filterts and re-render gallery*/

const reRenderGallery = (evt, data) => {

  clearGallery();

  let picturesData = data;

  if (evt.target === filterRandom) {

    const randomList = picturesData.slice();
    let swap = [];

    for (let i = 0; i <= picturesData.length - 1; i++) {

      const j = getRandomPositiveInteger(0, picturesData.length - 1);
      swap = randomList[i];
      randomList[i] = randomList[j];
      randomList[j] = swap;
    }

    randomList.length = MAX_COUNT;
    picturesData = randomList;
  }

  if (evt.target === filterDiscussed) {

    const discussedList = picturesData.slice().sort((x, y) => y.comments.length - x.comments.length);
    picturesData = discussedList;
  }

  renderGallery(picturesData);
};

const onClickRenderGallery = (cb) => {

  filterForm.addEventListener('click', (evt) => {

    filterToggle(evt.target.closest('.img-filters__button'));
    cb(evt, defaultList);
  }
  );
};

onClickRenderGallery(debounce(reRenderGallery, RENDER_DELAY));

