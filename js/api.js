import './alerts.js';
import './gallery.js';
import { renderGallery } from './gallery.js';

const filters = document.querySelector('.img-filters');
let defaultList = [];
const GET_DATA_LINK = 'https://27.javascript.pages.academy/kekstagram/data';
const SEND_DATA_LINK = 'https://27.javascript.pages.academy/kekstagram';

/* Get data from the server */

const getData = () => {
  fetch(GET_DATA_LINK)
    .then((response) => response.json())
    .then((pictures) => {
      renderGallery(pictures);
      defaultList = Array.from(pictures);
    });
};

getData();

filters.classList.remove('img-filters--inactive');

/* Send data to the server */

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_LINK,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData, defaultList };
