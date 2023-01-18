import './comments.js';
import './api.js';
import './utils.js';
import {
  hideElements,
  hideElement,
  showElement } from './utils.js';
import { defaultList } from './api.js';
import {
  getCommentsCaption,
  updateCommentsCouter,
  socialCommentsList,
  renderComments,
  showCommentsBtn,
  createNewComment,
  onButtonClickShowComments,
  commentInput,
  COMMENTS_SHOWN } from './comments.js';

const pictureOverlay = document.querySelector('.big-picture');
const pictureLink = pictureOverlay.querySelector('.big-picture__img > img');
const pictureCaption = pictureOverlay.querySelector('.social__caption');
const pictureLikes = pictureOverlay.querySelector('.likes-count');
const pictureCommentsCount = pictureOverlay.querySelector('.social__comment-count');
const likeBtn = pictureOverlay.querySelector('.likes-count');
const submitCommentBtn = pictureOverlay.querySelector('.social__footer-btn');

/* Render big picture */

const renderPicture = (evt) => {

  const link = evt.target.closest('.picture');

  pictureLink.src = defaultList[link.id].url;
  pictureCaption.textContent = defaultList[link.id].description;
  pictureLikes.textContent = defaultList[link.id].likes;
  submitCommentBtn.id = defaultList[link.id].id;

  renderComments(evt);

  const renderedComments = document.querySelectorAll('.social__comments > .social__comment');

  hideElements(renderedComments, COMMENTS_SHOWN);

  getCommentsCaption(evt);

  if (renderedComments.length < COMMENTS_SHOWN) {
    hideElement(showCommentsBtn);
  }

  likeBtn.addEventListener('click', () => {

    let currentLikes = defaultList[link.id].likes;
    currentLikes ++;

    defaultList[link.id].likes = currentLikes;
    pictureLikes.textContent = defaultList[link.id].likes;

    const likes = link.querySelector('.picture__likes');
    likes.textContent = defaultList[link.id].likes;
  });
};

/* Clear big picture modal and comments field */

const clearPicture = () => {

  pictureLink.src = '';
  pictureCaption.textContent = '';
  pictureLikes.textContent = '';
  pictureCommentsCount.textContent = '';
  commentInput.value = '';
  socialCommentsList.innerHTML = '';

  showElement(showCommentsBtn);
};

showCommentsBtn.addEventListener('click', onButtonClickShowComments);

submitCommentBtn.addEventListener('click', (evt) => {

  if (commentInput.value !== '') {
    createNewComment(evt);
    getCommentsCaption(evt);
    updateCommentsCouter(evt);
  }
});

export {
  renderPicture,
  clearPicture,
  pictureOverlay,
  pictureCommentsCount };
