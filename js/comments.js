import './api.js';
import './utils.js';
import './big-picture.js';
import { defaultList } from './api.js';
import { pictureCommentsCount } from './big-picture.js';
import {
  showElements,
  hideElement } from './utils.js';

const socialCommentsList = document.querySelector('.social__comments');
const showCommentsBtn = document.querySelector('.social__comments-loader');
const socialFooter = document.querySelector('.social__footer');
const socialPicture = socialFooter.querySelector('.social__picture');
const commentInput = socialFooter.querySelector('.social__footer-text');

const commentTemplate = document.querySelector('#comment').content;

const COMMENTS_SHOWN = 5;
const ONE = 1;
const ZERO = 0;

let hiddenComments = document.querySelectorAll('.social__comments > .hidden');
let renderedComments = document.querySelectorAll('.social__comments > .social__comment');

/*Update redered and hidden comments lists*/

const updateComments = () => {
  hiddenComments = document.querySelectorAll('.social__comments > .hidden');
  renderedComments = document.querySelectorAll('.social__comments > .social__comment');
};

/* Render comments for fullsize picture mode */

const renderComments = (evt) => {

  const link = evt.target.closest('.picture');
  const socialComments = defaultList[link.id].comments;

  if (defaultList[link.id].comments.length > 0) {

    socialComments.forEach(({message, avatar}) => {

      const socialComment = commentTemplate.cloneNode(true);
      socialComment.querySelector('.social__text').textContent = message;
      socialComment.querySelector('.social__picture').src = avatar;

      socialCommentsList.append(socialComment);
    });
  }
};

/* Show comments by click + update caption + hide show-comments button*/

const onButtonClickShowComments = () => {

  updateComments();

  showElements(hiddenComments, COMMENTS_SHOWN);

  updateComments();

  if (hiddenComments.length === 0 ) {
    hideElement(showCommentsBtn);
  }

  pictureCommentsCount.textContent = `Показано ${renderedComments.length - hiddenComments.length} из ${renderedComments.length} комментариев`;
};

/* Get comments caption for fullsize picture mode and new comments */

const getCommentsCaption = (evt) => {

  const link = evt.target.closest('.picture');
  const btn = evt.target.closest('.social__footer-btn');

  let id;

  if (document.contains(link)) {
    id = link.id;
  } else if (document.contains(btn)) {
    id = btn.id;
  }

  const comments = defaultList[id].comments.length;

  updateComments();

  if (comments > COMMENTS_SHOWN) {

    pictureCommentsCount.textContent = `Показано ${renderedComments.length - hiddenComments.length} из ${comments} комментариев`;

  } else {

    if (comments === ZERO || comments === COMMENTS_SHOWN) {

      pictureCommentsCount.textContent = `${comments} комментариев`;

    } else if (comments === ONE) {

      pictureCommentsCount.textContent = `${comments} комментарий`;

    } else if (comments < COMMENTS_SHOWN) {

      pictureCommentsCount.textContent = `${comments} комментария`;
    }
  }
};

/* Update comments counter for preview mode */

const updateCommentsCouter = (evt) => {

  const currentPicture = document.getElementById(evt.target.id);
  const currentPictureComments = currentPicture.querySelector('.picture__comments');
  const currentValue = Number(currentPictureComments.textContent);

  currentPictureComments.textContent = currentValue + 1;

};

/* Create new comment as new comments list item */

const createNewComment = (evt) => {

  const socialComment = commentTemplate.cloneNode(true);
  socialComment.querySelector('.social__text').textContent = commentInput.value;
  socialComment.querySelector('.social__picture').src = socialPicture.src;

  const newCommentItem = {
    id: defaultList[evt.target.id].comments.length + 1,
    avatar: socialPicture.src,
    message: commentInput.value
  };

  defaultList[evt.target.id].comments.push(newCommentItem);

  socialCommentsList.append(socialComment);

  commentInput.value = '';

  updateComments();
};

/* Block submit comment button */

export {
  renderComments,
  createNewComment,
  getCommentsCaption,
  updateCommentsCouter,
  onButtonClickShowComments,
  socialCommentsList,
  showCommentsBtn,
  commentTemplate,
  commentInput,
  COMMENTS_SHOWN };
