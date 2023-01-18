import './alerts.js';
import './gallery.js';
import { renderGallery } from './gallery.js';
import { renderErrorAlertGallery } from './alerts.js';

const filters = document.querySelector('.img-filters');
let defaultList = [];
const GET_DATA_LINK = 'https://27.javascript.pages.academy/kekstagram/data';
const SEND_DATA_LINK = 'https://27.javascript.pages.academy/kekstagram';

/* Get data from the server */

const getData = (onSuccess, onFail) => {
  fetch(GET_DATA_LINK)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw onFail();
    })
    .then((pictures) => {
      onSuccess(pictures);
      defaultList = Array.from(pictures);
    })
    .catch(() => {
      onFail();
    });
};

getData(renderGallery, renderErrorAlertGallery);

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
